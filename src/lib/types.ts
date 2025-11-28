// Tipos do sistema Uppi

export type UserRole = "owner" | "employee";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  active: boolean;
};

export type NotificationPreference = {
  email: boolean;
  whatsapp: boolean;
  phone?: string;
};

export type Client = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  notificationPreferences: NotificationPreference;
  createdAt: Date;
};

export type Appointment = {
  id: string;
  clientId: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notificationSent: boolean;
  createdAt: Date;
  employeeId?: string;
};

export type ComandaItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type Comanda = {
  id: string;
  clientId: string;
  clientName: string;
  items: ComandaItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: "open" | "closed" | "paid";
  paymentMethod?: "pix" | "card" | "cash";
  createdAt: Date;
  closedAt?: Date;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  read: boolean;
};

export type Notification = {
  id: string;
  type: "appointment" | "payment" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  appointmentId?: string;
};
