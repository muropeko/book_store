import React from "react";
import Link from "next/link";
import { Order } from "@prisma/client";
import { CartItem } from "../cart-item";
import { BadgeStatus } from ".";

interface Props {
  order: Order & { items: any[] };
}

export const OrderItem = ({ order }: Props) => {
  const isInactive = order.status === "SUCCEEDED";

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow border border-gray-200 transition-opacity ${
        isInactive ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-center mb-5">
        <p className="text-lg font-semibold text-gray-800">
          Замовлення <span className="text-gray-500">#{order.id}</span>
        </p>
        <BadgeStatus status={order.status} />
      </div>

      <div className="space-y-4">
        {order.items.map((item) => (
          <CartItem key={item.id} item={item} isStatic />
        ))}
      </div>

      {order.status === "PENDING" && (
        <Link
          href={`/payment/${order.id}`}
          className="mt-2 inline-block w-full bg-red-600 text-white py-3 rounded-md shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200 mt-2 text-center font-medium"
        >
          Оплатити замовлення
        </Link>
      )}
    </div>
  );
};
