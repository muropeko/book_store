'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@components/form'
import { Button } from '@components/ui'
import { Eye, EyeOff } from 'lucide-react'
import { registerUser } from 'app/actions'

const schema = z
  .object({
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
    password: z.string().min(6, 'Мінімум 6 символів'),
    confirmPassword: z.string().min(6, 'Підтвердіть пароль'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Паролі не збігаються',
  })

type RegistrationFormData = z.infer<typeof schema>

export const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: RegistrationFormData) => {
    setError(null)
    try {
      const { confirmPassword, ...userData } = data
      await registerUser(userData)
      reset()
      alert('ok!')
    } catch (err: any) {
      setError(err.message || 'Помилка при реєстрації')
    }
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Ім'я" placeholder="Ім'я" {...register('firstName')} error={errors.firstName?.message} />
        <Input label="Прізвище" placeholder="Прізвище" {...register('lastName')} error={errors.lastName?.message} />
      </div>

      <Input label="Email" type="email" placeholder="Введіть email" {...register('email')} error={errors.email?.message} />

      <Input
        label="Пароль"
        type={showPassword ? 'text' : 'password'}
        placeholder="Пароль"
        {...register('password')}
        error={errors.password?.message}
        rightIcon={
          showPassword ? (
            <EyeOff className="w-5 h-5 cursor-pointer" onClick={() => setShowPassword(false)} />
          ) : (
            <Eye className="w-5 h-5 cursor-pointer" onClick={() => setShowPassword(true)} />
          )
        }
      />

      <Input
        label="Підтвердіть пароль"
        type={showConfirm ? 'text' : 'password'}
        placeholder="Підтвердіть пароль"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
        rightIcon={
          showConfirm ? (
            <EyeOff className="w-5 h-5 cursor-pointer" onClick={() => setShowConfirm(false)} />
          ) : (
            <Eye className="w-5 h-5 cursor-pointer" onClick={() => setShowConfirm(true)} />
          )
        }
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-red-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:bg-red-700"
      >
        {isSubmitting ? 'Реєстрація…' : 'Зареєструватися'}
      </Button>
    </form>
  )
}
