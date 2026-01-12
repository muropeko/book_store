import React from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { Input, Textarea } from ".";

export const schema = z.object({
  firstName: z
    .string()
    .min(2, "Ім’я занадто коротке")
    .regex(/^[A-Za-zА-Яа-яЇїІіЄєҐґ'-]+$/, "Тільки букви"),
  lastName: z
    .string()
    .min(2, "Прізвище занадто коротке")
    .regex(/^[A-Za-zА-Яа-яЇїІіЄєҐґ'-]+$/, "Тільки букви"),
  email: z
    .string()
    .min(5, "Пошта занадто коротка")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Невірний формат пошти"),
  phone: z
    .string()
    .regex(/^\+380\d{9}$/, "Номер телефону має бути у форматі +380XXXXXXXXX"),
  address1: z
    .string()
    .min(5, "Адреса занадто коротка")
    .max(200, "Адреса занадто довга"),
  description: z
    .string()
    .max(300, "Максимум 300 символів")
    .optional(),
});

export type FormValues = z.infer<typeof schema>;

export const CheckoutForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className="grid grid-cols-2 gap-5">
      <Input
        label="Ім'я"
        placeholder="Введіть ваше ім'я"
        isImportant
        error={errors.firstName?.message}
        {...register("firstName")}
      />

      <Input
        label="Прізвище"
        placeholder="Введіть ваше прізвище"
        isImportant
        error={errors.lastName?.message}
        {...register("lastName")}
      />

      <Input
        label="Пошта"
        type="email"
        placeholder="example@mail.com"
        isImportant
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Номер телефону"
        type="tel"
        placeholder="+380 99 123 45 67"
        isImportant
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Input
        label="Адреса"
        placeholder="Введіть вашу адресу"
        isImportant
        error={errors.address1?.message}
        {...register("address1")}
        className="col-span-2"
      />

      <Textarea
        label="Деталі"
        placeholder="Додаткові деталі або коментар"
        error={errors.description?.message}
        {...register("description")}
        className="col-span-2"
      />
    </div>
  );
};
