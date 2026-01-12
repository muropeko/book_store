import { AdminNav, AdminSidebar, Container, Footer, Header } from '@components/shared';

export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] grid-rows-[auto_1fr_auto]">
  <Container className="row-span-3 border-r border-gray-300 py-5 flex flex-col">
  <h2 className="text-xl font-bold mb-6">[логотип]</h2>
  <AdminSidebar />
</Container>


  <AdminNav/>
    <main className="h-full bg-[#f6f6f6]">
  <div className="m-5 bg-white rounded-[px] border border-gray-300">
    {children}
  </div>
</main>

  <footer className="col-span-2">
    <Footer />
  </footer>
</div>

  );
}
