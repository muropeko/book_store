import { prisma } from "../../../../prisma/prisma-client";

export async function POST(req: Request) {
  try {
    const { orderId, status } = await req.json();
    if (!orderId || !status) throw new Error("Missing data");

    const order = await prisma.order.update({
      where: { id: Number(orderId) },
      data: { status },
    });

    return new Response(JSON.stringify({ order }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
