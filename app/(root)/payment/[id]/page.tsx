import { Container, Title } from "@components/index";
import { getUserOrder } from "app/actions/orders";
import { StripeCheckoutWrapper } from "@components/shared/stripe-checkout-wrapper";

interface PaymentPageProps {
  params: { id: string };
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const id = params.id;
  const order = await getUserOrder({ id });

  if (!order) {
    return <Container>Замовлення не знайдено</Container>;
  }

  if (order.status == "SUCCEEDED") {
    return (
      <Container className="py-5">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
          <Title text={`Замовлення #${order.id}`} className="font-medium mb-5" />
          <p className="text-green-700 font-semibold text-lg">Цей заказ вже оплачено ✅</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <StripeCheckoutWrapper
        orderId={order.id}
        cart={{
          id: order.id,
          totalAmount: order.totalAmount,
          items: order.items,
          userId: order.userId,
          token: order.token,
          userData: {
            fullName: order.fullName,
            email: order.email,
            phone: order.phone,
            address: order.address,
            comment: order.comment,
          },
        }}
      />
    </Container>
  );
}
