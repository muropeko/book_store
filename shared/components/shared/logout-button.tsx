'use client';

import { useRouter } from 'next/navigation';
import { logoutUser } from 'app/actions/user';

export const LogoutButton = ({ userId }: { userId: number }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser(userId);
    router.push('/'); // or '/auth/login'
  };

  return (
    <button className="font-semibold" onClick={handleLogout}>
      Вийти
    </button>
  );
};
