import { EmptyBlock, LogoutButton } from "@components/shared";
import { getAllUserOrders } from "app/actions/orders";
import AdminLayout from "app/(admin)/layout";
import RootLayout from "app/layout";
import { getCurrentUser } from "app/actions";
import { OrderItem } from "@components/shared/order";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user || 'token' in user) {
    return (
      <EmptyBlock
        title="Ви не авторизовані!"
        description="Щоб отримати доступ до цієї сторінки, будь ласка, увійдіть у свій акаунт."
        actionLabel="Увійти"
        actionHref="/auth/login"
        className="flex-1"
      />
    );
  }

  const orders = await getAllUserOrders({ userId: String(user.id) });
  const Layout = user.role === "ADMIN" ? AdminLayout : RootLayout;

  return (
    <Layout>
      <div className="bg-[#f6f6f6] min-h-screen py-8">
        <div className="p-6 w-[70%] mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left: Profile */}
          <aside className="lg:w-1/3 bg-white rounded-2xl shadow p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Профіль</h1>
            <p><span className="font-semibold">ID:</span> {user.id}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Ім’я:</span> {user.firstName} {user.lastName}</p>

            {/* LogoutButton is client, fine to use here */}
            <LogoutButton userId={user.id} />
          </aside>

          {/* Right: Orders */}
          <main className="lg:w-3/4 space-y-6">
            <h2 className="text-2xl font-bold mb-6">Мої замовлення</h2>

            {!orders || orders.length === 0 ? (
              <div className="bg-white border border-dashed rounded-xl p-6 text-center text-gray-500 shadow-sm">
                У вас ще немає замовлень
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(o => (
                  <OrderItem key={o.id} order={o} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}
