import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { chatId, content } = await req.json();

    const token = req.cookies.get("jwt")?.value;
    if (!token) {
      console.log("[CHAT] No JWT, unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let payload: { userId: number; sessionToken: string };
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    } catch (err) {
      console.log("[CHAT] JWT invalid");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId, sessionToken: payload.sessionToken },
    });
    if (!user) {
      console.log("[CHAT] User not found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let chat;
    if (!chatId) {
      chat = await prisma.chat.create({
        data: { userId: user.id, status: "AVAILABLE" },
      });
      console.log("[CHAT] Created new chat", chat.id);
    } else {
      chat = await prisma.chat.findUnique({ where: { id: chatId } });
      if (!chat) return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    const message = await prisma.message.create({
      data: { chatId: chat.id, senderId: user.id, content },
    });

    console.log("[CHAT] New message:", message);

    return NextResponse.json({ chatId: chat.id, message });
  } catch (err) {
    console.error("[CHAT] sendMessage error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
