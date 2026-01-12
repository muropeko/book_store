'use client';

import { LoginForm } from '@components/form';

export default function LoginPage () {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">Вхід</h1>

        <LoginForm />

        <p className="text-center text-gray-500 text-sm">
          Не маєте аккаунту?{' '}
          <a href="/auth/register" className="text-red-600 font-medium hover:underline">
            Зареєструватись
          </a>
        </p>
      </div>
    </div>
  );
}
