import { BadgeStatus } from "@components/shared/order";
import { Container, Loader, Title } from "@components/shared";
import { OrderSectionWrapper, OrderTable } from "@components/shared/admin-order";
import { unknownCover } from "@components/shared/book-card";
import { getUserOrder } from "app/actions/orders";
import { mapBookFormat, mapBookLanguage } from "constants/book";
import React from "react";

interface OrderPageProps {
  params: { id: string };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = params;
  const order = await getUserOrder({ id });

  if (!order) return <Loader />;

  return (
    <Container className="py-5 flex flex-col">
      <div className='flex flex-row gap-7 items-center'>
        <p className="text-2xl font-semibold text-gray-800">
          Замовлення <span className="text-gray-500">#{order.id}</span>
        </p> 
        <BadgeStatus status={order.status} />
      </div>
      

      <div className="grid grid-cols-3 gap-5 mt-5">
        <OrderSectionWrapper className="col-span-1 row-span-2" text="Деталі замовлення">
          <OrderTable
            data={[
              { label: "Ім'я", value: <span className="break-words">{order.fullName}</span> },
              { label: "Пошта", value: <span className="break-words">{order.email}</span> },
              { label: "Номер телефону", value: <span className="break-words">{order.phone}</span> },
            ]}
          />
        </OrderSectionWrapper>

        <OrderSectionWrapper className="col-span-1 row-span-2" text="Delivery Address">
          <OrderTable
            data={[
              { label: "Адрес", value: <span className="break-words">{order.address}</span> },
            ]}
          />
        </OrderSectionWrapper>

        <OrderSectionWrapper className="col-span-1 row-span-2" text="Order History">
          {/* Тут можна додати історію статусів */}уауауа
        </OrderSectionWrapper>

        <OrderSectionWrapper className="col-span-2">
          <div className="flex justify-between items-center font-semibold pb-2 mb-4 text-gray-700">
            <div className="flex-1">Деталі замовлення</div>
            <div className="w-[60px] text-center">К-сть</div>
            <div className="w-[80px] text-center">Ціна</div>
            <div className="w-[80px] text-center">Всього</div>
          </div>

          <div className="flex flex-col gap-8">
            {order.items.map((i) => {
              const totalPrice = (i.price ?? i.bookItem.price) * i.quantity;

              return (
                <div key={i.id} className="flex justify-between items-center">
                  <div className="flex flex-1 gap-8">
                    <div className="flex-shrink-0">
                      <img
                        src={i.bookItem.book.coverUrl || unknownCover}
                        alt={i.bookItem.book.title || 'Book cover'}
                        className="h-[130px] object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-between break-words">
                      <p className="font-semibold text-lg leading-tight break-words">
                        {i.bookItem.book.title}
                      </p>
                      <p className="text-gray-500 text-sm leading-snug break-words">
                        {i.bookItem.book.author?.firstName} {i.bookItem.book.author?.lastName}
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600 mt-3 break-words">
                        <span className="font-medium">Формат:</span>
                        <span>{mapBookFormat[i.bookItem.format]}</span>

                        <span className="font-medium">Мова:</span>
                        <span>{mapBookLanguage[i.bookItem.language]}</span>

                        <span className="font-medium">Видавництво:</span>
                        <span>{i.bookItem.book.publisher?.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-[60px] text-center font-medium">
                    {i.quantity}
                  </div>

                  <div className="flex-shrink-0 w-[80px] text-center font-semibold">
                    {i.price ?? i.bookItem.price} ₴
                  </div>

                  <div className="flex-shrink-0 w-[80px] text-center font-semibold">
                    {totalPrice} ₴
                  </div>
                </div>
              );
            })}
          </div>
        </OrderSectionWrapper>

        <OrderSectionWrapper className="col-span-1" text="Підсумок замовлення">
          <p className="break-words">{order.comment || '-'}</p>
        </OrderSectionWrapper>
      </div>
    </Container>
  );
}
