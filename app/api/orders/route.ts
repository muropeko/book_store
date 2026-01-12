import { prisma } from "../../../prisma/prisma-client";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const { cartId, fullName, email, phone, address, comment } = await req.json();

    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { bookItem: true } } },
    });
    if (!cart) throw new Error("Кошик не знайдено");

    // Проверяем, есть ли уже PENDING заказ для юзера или токена
    let order = cart.userId
      ? await prisma.order.findFirst({ where: { userId: cart.userId, status: "PENDING" } })
      : await prisma.order.findFirst({ where: { token: cart.token, status: "PENDING" } });

    const orderItems = cart.items.map(item => ({
      bookItemId: item.bookItemId,
      quantity: item.quantity,
      price: item.bookItem.price,
    }));

    if (!order) {
      // Если заказа нет — создаём новый
      order = await prisma.order.create({
        data: {
          userId: cart.userId || null,
          token: cart.userId ? null : cart.token || randomUUID(),
          totalAmount: cart.totalAmount,
          items: { create: orderItems },
          fullName,
          email,
          phone,
          address,
          comment,
        },
        include: { items: true },
      });
    } else {
      // Если заказ есть — можно обновить его содержимое и totalAmount
      order = await prisma.order.update({
        where: { id: order.id },
        data: {
          totalAmount: cart.totalAmount,
          items: { deleteMany: {}, create: orderItems },
          fullName,
          email,
          phone,
          address,
          comment,
        },
        include: { items: true },
      });
    }

    // очищаем корзину
    await prisma.cartItem.deleteMany({ where: { cartId } });

    return new Response(JSON.stringify({ order }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
