'use client';
import { useState } from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@components/ui";

interface StripeCheckoutProps {
  orderId: number;
  totalAmount: number;
}

export const StripeCheckout = ({ orderId, totalAmount }: StripeCheckoutProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const { clientSecret, error } = await res.json();
      if (error || !clientSecret) throw new Error(error || "Не вдалося створити платіж");

      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) throw new Error("CardElement не знайдено");

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (paymentResult.error) {
        setStatusMessage(`Помилка платежу: ${paymentResult.error.message}`);
      } else if (paymentResult.paymentIntent?.status === "succeeded") {
        await fetch("/api/orders/update-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, status: "SUCCEEDED" }),
        });

        setStatusMessage("Платіж успішний, замовлення оновлено!");
      }
    } catch (err: any) {
      setStatusMessage(err.message || "Помилка під час оплати");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-xl shadow border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Оплата замовлення</h2>

      <div className="space-y-2">
        <label className="font-medium text-gray-700">Номер картки</label>
        <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
          <CardNumberElement options={{ style: { base: { fontSize: "16px" } } }} />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <label className="font-medium text-gray-700">Термін дії</label>
          <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
            <CardExpiryElement options={{ style: { base: { fontSize: "16px" } } }} />
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <label className="font-medium text-gray-700">CVV</label>
          <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
            <CardCvcElement options={{ style: { base: { fontSize: "16px" } } }} />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full mt-4 py-3 text-base font-medium text-white bg-red-600 rounded-lg shadow-md hover:bg-red-800"
      >
        {loading ? "Здійснюється оплата…" : `Оплатити ${totalAmount} ₴`}
      </Button>

      {statusMessage && (
        <p className={`mt-3 text-center text-sm ${statusMessage.includes("Помилка") ? "text-red-600" : "text-green-600"}`}>
          {statusMessage}
        </p>
      )}
    </form>
  );
};
