import { CartSheet, Footer, Header, NavBar } from '@components/shared';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Book Store',
};

export default function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <NavBar />

      <main className="flex-1 flex flex-col">
        {children}
      </main>


      <Footer />
    </div>
  );
}
