import { cookies } from "next/headers";
import { prisma } from "../../prisma/prisma-client";

interface IProps {
    id: string;
}

export const getUserOrder = async ({ id }: { id: string }) => {
  const numericOrderId = Number(id);
  if (isNaN(numericOrderId)) return null;

  const order = await prisma.order.findUnique({
    where: { id: numericOrderId },
    include: {
      user: true,
      items: {
        include: { 
          bookItem: {
            include: {
              book: {
                include: {
                  author: true,
                  publisher: true
                }
              }
            }
          }
        }
      },
    },
  });

  return order;
};



export const getAllOrders = async () => {
    const orders = await prisma.order.findMany({
      include: { user: true },
      orderBy: [
        { status: 'desc' },
        { updatedAt: 'desc' }
      ]
    });

    return orders
}

export const getAllUserOrders = async ({userId}: {userId: string}) => {
  const orders = await prisma.order.findMany({
    where: { userId: Number(userId) },
    include: {
      items: {
        include: { 
          bookItem: {
            include: {
              book: {
                include: { author: true, publisher: true }
              }
            }
          }
        }
      }
    }
  });
  return orders;
}
