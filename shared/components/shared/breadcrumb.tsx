'use client';

import React, { FC } from 'react';
import { Breadcrumb } from '@components/ui';
import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@components/ui/breadcrumb';
import { SlashIcon } from 'lucide-react';
import Link from 'next/link';
import { Title } from './title';
import { usePathname } from 'next/navigation';

interface Props {
  className?: string;
  title: string;
  noList?: boolean;
}

export const BreadcrumbCustom: FC<Props> = ({ className, title, noList = false }) => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <div className={`relative ${className ?? ""}`}>
      <Breadcrumb
        className="relative flex items-center justify-center flex-col gap-5 py-[60px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://bookly-theme.myshopify.com/cdn/shop/files/about-10_1.jpg?v=1678773087&width=1920')",
        }}
      >
        <div className="absolute inset-0 bg-[#fdefe1] opacity-90 z-0" />

        <div className="relative z-10 w-full flex items-center flex-col gap-4">
          <Title text={title} size="lg" />
        </div>
      </Breadcrumb>
    </div>
  );
};
