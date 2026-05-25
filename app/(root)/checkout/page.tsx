'use client'

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, EmptyBlock, Loader } from "@components/index";
import { OrderSectionWrapper } from "@components/shared/admin-order";
import { CartItem } from "@components/shared/cart-item";
import { useCart } from "shared/store/cart";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { CheckoutForm, FormValues, schema } from "@components/form/checkout-form";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cart, loadCart, loading } = useCart();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            await loadCart();
        };
        fetchCart();
    }, []);

    const methods = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data: FormValues) => {
        if (!cart) return;
        setSubmitting(true);

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  cartId: cart.id,
                  fullName: `${data.firstName} ${data.lastName}`,
                  email: data.email,
                  phone: data.phone,
                  address: data.address1,
                  comment: data.description,
              }),

            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Помилка створення замовлення");

            const order = result.order;
            router.replace(`/payment/${order.id}`);
        } catch (err: any) {
            console.error(err);
            alert(err.message);
            setSubmitting(false);
        }
    };

    return (
      <Container className=" flex flex-row justify-center gap-10 py-5 items-start">
        {/* LEFT: Shipping form */}
        <OrderSectionWrapper
          text="Адреса Доставки"
          className="inline-block bg-red-300 w-[40%] self-start"
        >
          <FormProvider {...methods}>
            <CheckoutForm />
          </FormProvider>
        </OrderSectionWrapper>

        {/* RIGHT: Cart */}
        <OrderSectionWrapper text="Ваш Кошик" className="flex flex-col bg-red-300 w-[40%]">
          <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea.Root className="h-[350px] w-full">
              <ScrollArea.Viewport className="h-full w-full p-4 flex flex-col gap-4">
                {loading ? (
                  <Loader />
                ) : cart?.items.length ? (
                  cart.items.map((i) => <CartItem key={i.id} item={i} isStatic />)
                ) : (
                  <div className="flex flex-col justify-center items-center flex-1">
                    <EmptyBlock title="Пусто!" description="" className="flex-1" />
                  </div>
                )}
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar orientation="vertical" className="w-2">
                <ScrollArea.Thumb className="block rounded-full bg-neutral-400/70" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </div>

          {/* Підсумок + кнопка */}
          <div className="mt-4 pt-4 border-t flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Разом:</span>
              <span className="text-2xl font-bold text-gray-900">₴{cart?.totalAmount ?? 0}</span>
            </div>

            {/* Кнопка поза формою */}
            <Button
              onClick={methods.handleSubmit(onSubmit)}
              disabled={submitting}
              className="w-full py-3 rounded-2xl bg-black text-white font-medium hover:bg-gray-800 transition"
            >
              {submitting ? "Створюємо замовлення..." : "Оформити замовлення"}
            </Button>
          </div>
        </OrderSectionWrapper>
      </Container>
    );
}
