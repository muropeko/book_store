'use client';

import { RegistrationForm } from '@components/form';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">Реєстрація</h1>

        <RegistrationForm />

        <p className="text-center text-gray-500 text-sm">
          Вже маєте акаунт?{' '}
          <a href="/auth/login" className="text-red-600 font-medium hover:underline">
            Увійти
          </a>
        </p>
      </div>
    </div>
  );
}
