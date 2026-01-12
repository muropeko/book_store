import { OrderStatus } from '@prisma/client';
import React from 'react';
import { cn } from 'shared/lib/utils';

interface Props {
  status: OrderStatus;
}

export const BadgeStatus = ({ status }: Props) => {
  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case "SUCCEEDED":
        return "bg-lime-200 text-lime-800 ring-1 ring-lime-300";
      case "CANCELLED":
        return "bg-red-200 text-red-800 ring-1 ring-red-300";
      default:
        return "bg-yellow-200 text-yellow-800 ring-1 ring-yellow-300";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center h-6 px-3 rounded-full text-sm font-medium shadow-sm transition-all duration-200",
        getStatusStyle(status)
      )}
    >
      {status}
    </span>
  );
};
