"use server";

import { cookies } from "next/headers";
import { prisma } from "../../prisma/prisma-client";
import { User, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { createCart } from ".";

interface JwtPayload {
  userId: string;
  sessionToken: string;
}

export const getCurrentUser = async (): Promise<User | { token: string } | null> => {
  const cookieStore = await cookies();
  const jwtToken = cookieStore.get("jwt")?.value;
  const cartToken = cookieStore.get("cart_token")?.value;

  if (jwtToken) {
    let payload: JwtPayload;
    try {
      payload = jwt.verify(jwtToken, process.env.JWT_SECRET!) as JwtPayload;
    } catch {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(payload.userId), sessionToken: payload.sessionToken },
    });

    return user;
  }

  if (cartToken) {
    return { token: cartToken };
  }

  return null;
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: { id },
  });

  if (!user) return null;

  return user;
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    where: { role: UserRole.USER },
    include: {
      orders: { select: { id: true, totalAmount: true, status: true, createdAt: true } },
      cart: { select: { totalAmount: true, expiresAt: true, items: true } },
    },
  });

  return users.map((u) => {
    const paidOrders = u.orders.filter((o) => o.status === "SUCCEEDED");

    const orderCount = paidOrders.length;
    const totalSpent = paidOrders.reduce((acc, o) => acc + o.totalAmount, 0);

    const lastOrder = paidOrders.length
      ? paidOrders.reduce((latest, o) => (o.createdAt > latest.createdAt ? o : latest))
      : null;

    return {
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
      orderCount,
      totalSpent,
      lastOrderDate: lastOrder?.createdAt || null,
      lastOrderStatus: lastOrder?.status || null,
      cartTotalAmount: u.cart?.totalAmount || 0,
      cartItemCount: u.cart?.items.length || 0,
      cartExpiresAt: u.cart?.expiresAt || null,
    };
  });
};

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const registerUser = async (data: RegisterData) => {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error("Користувач з таким email вже існує");

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashed,
    },
  });

  return user;
};

const JWT_SECRET = process.env.JWT_SECRET!;

type LoginUserData = {
  email: string;
  password: string;
};

export const loginUser = async (data: LoginUserData) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Email або пароль невірні");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("Email або пароль невірні");

  const sessionToken = uuidv4();
  await prisma.user.update({
    where: { id: user.id },
    data: { sessionToken },
  });

  const token = jwt.sign({ userId: user.id, sessionToken }, JWT_SECRET, { expiresIn: "7d" });

  const cookieStore = await cookies();

  cookieStore.set({
    name: "jwt",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  cookieStore.delete({
    name: "cart_token",
    path: "/",
  });

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  };
};

export const logoutUser = async (userId?: number) => {
  const cookieStore = await cookies();

  cookieStore.delete({ name: "jwt", path: "/" });

  if (userId) {
    await prisma.user.update({
      where: { id: userId },
      data: { sessionToken: null },
    });
  }

  await createCart();

  return true;
};
