'use client';

import { useRouter, usePathname } from "next/navigation";
import path from "path";
import { ADMIN_PAGES } from "shared/services/pages-routes";

interface Props {
  className?: string;
}

export const AdminSidebar = ({ className }: Props) => {
  const router = useRouter();
  const pathname = usePathname();


  return (
      <nav className={`flex flex-col ${className}`}>
        {ADMIN_PAGES.map((page) => {
          const isActive = pathname === page.link;
          const childrenRoute = pathname.includes(page.link)

          return (
            <button
              key={page.link}
              onClick={() => router.push(page.link)}
              className={`flex items-center gap-3 py-3 rounded text-left
                ${
                  isActive || childrenRoute
                    ? "text-red-600" // активний стан
                    : "hover:bg-red-100 hover:text-red-600 text-gray-700" // hover + неактивний
                }`}
            >
              {page.icon}
              <span>{page.label}</span>
            </button>
          );
        })}
      </nav>
  );
};
