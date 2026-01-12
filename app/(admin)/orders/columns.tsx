"use client"

import { BadgeStatus } from "@components/shared/order"
import { Badge } from "@components/ui/badge"
import { OrderStatus } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

// Тип рядка таблиці
export type OrderDashboardRow = {
  id: number
  token?: string
  status: OrderStatus
  address: string
  createdAt: string
  user: {
    firstName: string
    lastName: string
    email: string
  } | null
}

// Колонки для react-table з українськими заголовками
export const columns: ColumnDef<OrderDashboardRow>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "user",
    header: "Користувач",
    cell: info => info.row.original.user
        ? `${info.row.original.user.firstName} ${info.row.original.user.lastName}`
        : "Гість"
  },
  {
    accessorKey: "address",
    header: "Адреса доставки",
  },
  {
    accessorKey: "status",
    header: "Статус замовлення",
    cell: info => {
      const status = info.getValue<OrderStatus>()
      return <BadgeStatus status={status} />
    },
  },
  {
    accessorKey: "createdAt",
    header: "Дата створення",
    cell: info =>
      new Date(info.getValue<string>()).toLocaleDateString("uk-UA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
  },
]
