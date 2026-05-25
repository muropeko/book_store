'use server';

import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "../../prisma/prisma-client";
import { getCurrentUser } from "./user";
import { discountMap } from "shared/lib/calc-discount";
import { DiscountType } from "@prisma/client";

export const createCart = async (userId?: number, token?: string) => {
  const cookieStore = await cookies();

  if (!userId && !token) {
    token = randomUUID();
    cookieStore.set("cart_token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60,
      path: "/",
    });
  }

  const cart = await prisma.cart.create({
    data: userId
      ? { userId }
      : { token, expiresAt: new Date(Date.now() + 1000 * 60 * 60) },
    include: {
      items: {
        include: {
          bookItem: {
            include: { book: { include: { author: true } } },
          },
        },
      },
    },
  });

  return cart;
};

export const fetchCart = async (userId?: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("cart_token")?.value;

  const numericUserId = userId
    ? Number(userId)
    : (await getCurrentUser())?.id;

  let cart;

  if (numericUserId) {
    cart = await prisma.cart.findUnique({
      where: { userId: numericUserId },
      include: {
        items: {
          include: { bookItem: { include: { book: { include: { author: true, publisher: true } } } } },
        },
      },
    });
  } else if (token) {
    cart = await prisma.cart.findUnique({
      where: { token },
      include: {
        items: {
          include: { bookItem: { include: { book: { include: { author: true, publisher: true } } } } },
        },
      },
    });
  }

  if (!cart) {
    cart = await createCart(numericUserId, token);
  }

  if (cart?.items) {
    cart.totalAmount = cart.items.reduce((sum, item) => {
      const price = item.bookItem.price;
      const discountPercent = item.bookItem.book.discount
        ? discountMap[item.bookItem.book.discount as DiscountType]
        : 0;
      const priceWithDiscount = Math.round(price * (1 - discountPercent / 100));
      return sum + priceWithDiscount * item.quantity;
    }, 0);
  }

  return cart;
};

const updateCartTotalAmount = async (cartId: number) => {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { items: { include: { bookItem: { include: { book: true } } } } },
  });

  if (!cart) throw new Error("Cart not found");

  const totalAmount = cart.items.reduce((sum, item) => {
    const price = item.bookItem.price;
    const discountPercent = item.bookItem.book.discount
      ? discountMap[item.bookItem.book.discount as DiscountType]
      : 0;
    const priceWithDiscount = Math.round(price * (1 - discountPercent / 100));
    return sum + priceWithDiscount * item.quantity;
  }, 0);

  await prisma.cart.update({
    where: { id: cartId },
    data: { totalAmount },
  });

  return await fetchCart();
};

export const addCartItem = async (bookItemId: number, itemQuantity: number) => {
  const cart = await fetchCart();

  await prisma.cartItem.upsert({
    where: { cartId_bookItemId: { cartId: cart.id, bookItemId } },
    update: { quantity: { increment: itemQuantity } },
    create: { cartId: cart.id, bookItemId, quantity: itemQuantity },
    include: { bookItem: { include: { book: { include: { author: true } } } } },
  });

  return await updateCartTotalAmount(cart.id);
};

export const subtractCartItem = async (bookItemId: number, itemQuantity: number) => {
  const cart = await fetchCart();
  const cartItem = cart.items.find(item => item.bookItem.id === bookItemId);
  if (!cartItem) return cart;

  const newQuantity = Math.max(cartItem.quantity - itemQuantity, 0);

  if (newQuantity > 0) {
    await prisma.cartItem.update({
      where: { cartId_bookItemId: { cartId: cart.id, bookItemId } },
      data: { quantity: newQuantity },
    });
  } else {
    await prisma.cartItem.delete({
      where: { cartId_bookItemId: { cartId: cart.id, bookItemId } },
    });
  }

  return await updateCartTotalAmount(cart.id);
};

export const deleteCartItem = async (cartItemId: number) => {
  const cartItem = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
  if (!cartItem) throw new Error("CartItem not found");

  await prisma.cartItem.delete({ where: { id: cartItemId } });

  return await updateCartTotalAmount(cartItem.cartId);
};
