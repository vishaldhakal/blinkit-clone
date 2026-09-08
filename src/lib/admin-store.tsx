import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { products } from "./data";

export type OrderStatus = "new" | "assigned" | "packing" | "on-the-way" | "delivered";

export type OrderItem = { name: string; qty: number; price: number };

export type Order = {
  id: string;
  customer: string;
  address: string;
  phone: string;
  placedAt: string;
  etaMin: number;
  status: OrderStatus;
  riderId?: string;
  channel: "App" | "Web" | "POS";
  payment: "UPI" | "Card" | "Cash";
  items: OrderItem[];
};

export type Rider = {
  id: string;
  name: string;
  initials: string;
  zone: string;
  vehicle: string;
  phone: string;
  online: boolean;
  rating: number;
  deliveriesToday: number;
};

export const statusMeta: Record<OrderStatus, { label: string; tint: string; text: string }> = {
  new: { label: "New", tint: "#eef2f7", text: "#334155" },
  assigned: { label: "Assigned", tint: "#fff3d6", text: "#8a5a00" },
  packing: { label: "Packing", tint: "#ffe6e2", text: "#a8331f" },
  "on-the-way": { label: "Out for delivery", tint: "#e0f2ff", text: "#0b5f8a" },
  delivered: { label: "Delivered", tint: "#e4f6e4", text: "#1c6b34" },
};

export const statusFlow: OrderStatus[] = ["new", "assigned", "packing", "on-the-way", "delivered"];

export const riders: Rider[] = [
  { id: "r1", name: "Aditya Kale", initials: "AK", zone: "Vishrantwadi", vehicle: "Scooter · MH12 KP 4421", phone: "+91 98220 11223", online: true, rating: 4.9, deliveriesToday: 14 },
  { id: "r2", name: "Sana Shaikh", initials: "SS", zone: "Kalyani Nagar", vehicle: "EV Bike · MH12 QR 8890", phone: "+91 98220 44551", online: true, rating: 4.8, deliveriesToday: 11 },
  { id: "r3", name: "Rohit Verma", initials: "RV", zone: "Yerawada", vehicle: "Scooter · MH14 AB 1102", phone: "+91 90040 77341", online: true, rating: 4.7, deliveriesToday: 9 },
  { id: "r4", name: "Meera Joshi", initials: "MJ", zone: "Viman Nagar", vehicle: "Cycle · —", phone: "+91 90040 22119", online: false, rating: 4.6, deliveriesToday: 6 },
  { id: "r5", name: "Imran Qureshi", initials: "IQ", zone: "Dhanori", vehicle: "EV Bike · MH12 ZX 5567", phone: "+91 99870 33418", online: true, rating: 5, deliveriesToday: 17 },
];

const pick = (i: number) => products[i % products.length]!;

function seedOrder(
  n: number,
  customer: string,
  address: string,
  status: OrderStatus,
  etaMin: number,
  placedAt: string,
  channel: Order["channel"],
  payment: Order["payment"],
  riderId?: string,
): Order {
  const items: OrderItem[] = [0, 1, 2].map((k) => {
    const p = pick(n * 7 + k * 13);
    return { name: p.name, qty: ((n + k) % 3) + 1, price: p.price };
  });
  return {
    id: `BK${93800 + n}`,
    customer,
    address,
    phone: `+91 9${(820000000 + n * 13571).toString().slice(0, 9)}`,
    placedAt,
    etaMin,
    status,
    riderId,
    channel,
    payment,
    items,
  };
}

const seedOrders: Order[] = [
  seedOrder(1, "Tomas Miller", "1006 Wadsworth Dr, Apt 24", "new", 8, "12:41", "App", "UPI"),
  seedOrder(2, "Stephanie May", "293 Rensington Rd, Apt 135", "new", 9, "12:43", "Web", "Card"),
  seedOrder(3, "Lucas Pleinsborough", "927 Kensington Dr", "packing", 6, "12:36", "App", "UPI", "r2"),
  seedOrder(4, "Tommy James", "1006 Wadsworth Dr, Apt 24", "on-the-way", 4, "12:29", "App", "Cash", "r1"),
  seedOrder(5, "Bessie Cooper", "412 Willow Rd", "assigned", 11, "12:44", "POS", "Cash", "r3"),
  seedOrder(6, "Ralph Edwards", "2600 Navy Blvd", "on-the-way", 3, "12:25", "App", "UPI", "r5"),
  seedOrder(7, "Jacob Jones", "206 Meco Rd", "delivered", 0, "12:05", "Web", "Card", "r1"),
  seedOrder(8, "Arlene McCoy", "2131 Willow Rd", "delivered", 0, "11:52", "App", "UPI", "r2"),
  seedOrder(9, "Floyd Miles", "206 Washington Way", "delivered", 0, "11:40", "POS", "Cash", "r5"),
];

export const orderTotal = (o: Order) => o.items.reduce((s, i) => s + i.qty * i.price, 0);

type AdminCtx = {
  orders: Order[];
  riders: Rider[];
  advance: (id: string) => void;
  setStatus: (id: string, status: OrderStatus) => void;
  assignRider: (id: string, riderId: string) => void;
  createOrder: (o: { customer: string; address: string; items: OrderItem[]; payment: Order["payment"] }) => string;
};

const Ctx = createContext<AdminCtx | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [seq, setSeq] = useState(0);

  const setStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status, etaMin: status === "delivered" ? 0 : o.etaMin } : o)));
  }, []);

  const advance = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = statusFlow[Math.min(statusFlow.indexOf(o.status) + 1, statusFlow.length - 1)]!;
        return { ...o, status: next, etaMin: next === "delivered" ? 0 : o.etaMin };
      }),
    );
  }, []);

  const assignRider = useCallback((id: string, riderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, riderId, status: o.status === "new" ? "assigned" : o.status } : o)),
    );
  }, []);

  const createOrder = useCallback<AdminCtx["createOrder"]>((o) => {
    const id = `BK${94100 + seq}`;
    setSeq((s) => s + 1);
    setOrders((prev) => [
      {
        id,
        customer: o.customer || "Walk-in customer",
        address: o.address || "Counter pickup",
        phone: "+91 90000 00000",
        placedAt: "now",
        etaMin: 10,
        status: "new",
        channel: "POS",
        payment: o.payment,
        items: o.items,
      },
      ...prev,
    ]);
    return id;
  }, [seq]);

  const value = useMemo(
    () => ({ orders, riders, advance, setStatus, assignRider, createOrder }),
    [orders, advance, setStatus, assignRider, createOrder],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAdmin() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
