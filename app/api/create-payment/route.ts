import { prisma } from "../../../prisma/prisma-client";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-08-27.basil" });

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();
    if (!orderId) throw new Error("Order ID missing");

    const order = await prisma.order.findUnique({
      where: { id: Number(orderId) },
      include: { items: { include: { bookItem: { include: { book: true}} } } },
    });

    if (!order) throw new Error("Order not found");

    const line_items = order.items.map(item => ({
      price_data: {
        currency: "uah",
        product_data: { name: item.bookItem.book.title },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Создаем PaymentIntent вместо редиректа
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.totalAmount * 100,
      currency: "uah",
      payment_method_types: ["card"],
      metadata: { orderId: String(order.id) },
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
