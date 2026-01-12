'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@components/form'
import { Button } from '@components/ui'
import { Eye, EyeOff } from 'lucide-react'
import { loginUser } from 'app/actions/user' // server action для логіну
import { useRouter } from 'next/navigation'

// Валідація
const schema = z.object({
  email: z
    .string()
    .min(5, "Пошта занадто коротка")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Невірний формат пошти"),
  password: z.string()
})

type LoginFormData = z.infer<typeof schema>

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    try {
      const success = await loginUser(data)
      if (!success) {
        setError('Email або пароль невірні')
        return
      }
      reset()
      router.replace('/profile')
    } catch (err: any) {
      setError(err.message || 'Помилка при вході')
    }
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        type="email"
        placeholder="Введіть email"
        {...register('email')}
        error={errors.email?.message}
      />

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

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-red-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:bg-red-700"
      >
        {isSubmitting ? 'Вхід…' : 'Увійти'}
      </Button>
    </form>
  )
}
