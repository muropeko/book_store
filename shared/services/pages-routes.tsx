import { Users, MessageCircle, LayoutList, ShoppingCart } from "lucide-react"; 
import type { ReactNode } from "react";

interface AdminPage {
  icon: ReactNode;
  link: string;
  label: string;
}
export const PAGES = [
  { link: '/', label: 'Головна' },
  { link: '/books', label: 'Категорії' },
  { link: '/', label: `Видавництво` },
  { link: '/', label: 'Деталі' },
]

export const ADMIN_PAGES: AdminPage[] = [
  { icon: <Users />, link: '/users', label: 'Користувачі' },
  { icon: <MessageCircle />, link: '/chats', label: 'Чати' },
  { icon: <LayoutList />, link: '/products', label: 'Товари' },
  { icon: <ShoppingCart />, link: '/orders', label: 'Замовлення' },
];