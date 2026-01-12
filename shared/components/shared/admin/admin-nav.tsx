'use client';

import Link from "next/link";
import { Title } from "../title";
import { UserPen } from "lucide-react";
import { Container } from "../container";
import { usePathname } from "next/navigation";
import { ADMIN_PAGES } from "shared/services/pages-routes";

export const AdminNav = () => {
  const pathname = usePathname();
  const activePage = ADMIN_PAGES.find(page => pathname.startsWith(page.link));
  
  return (
    <Container className="flex items-center justify-between border-b border-gray-300 py-5">
      <Title text={activePage?.label || ""} />

      <div className="flex items-center gap-4">
        <Link href="/profile" className="flex items-center">
          <UserPen className="cursor-pointer" />
        </Link>
      </div>
    </Container>
  );
};
