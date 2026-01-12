"use client"

import { ColumnDef } from "@tanstack/react-table"

export type UserDashboardRow = {
  id: number
  firstName: string
  lastName: string
  email: string
  orderCount: number
  totalSpent: number
  lastOrderDate: Date | null
}

export const columns: ColumnDef<UserDashboardRow>[] = [
  {
    accessorKey: "firstName",
    header: "Користувач",
    cell: info => `${info.row.original.firstName} ${info.row.original.lastName}`,
  },
  {
    accessorKey: "email",
    header: "Електронна пошта",
  },
  {
    accessorKey: "orderCount",
    header: "Кількість замовлень",
  },
  {
    accessorKey: "totalSpent",
    header: "Витрачено всього",
    cell: info => info.getValue<number>().toLocaleString('uk-UA', {
      style: 'currency',
      currency: 'UAH'
    }),
  },
  {
    accessorKey: "lastOrderDate",
    header: "Останнє замовлення",
    cell: info =>
      info.getValue<Date | null>()
        ? new Date(info.getValue<Date>()).toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : "-",
  },
]
