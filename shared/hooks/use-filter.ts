'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export interface IFilters {
  categoryId?: number;
  author?: number;
  sortBy?: string;
  publishers?: number;

}

export const useFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<IFilters>({
    categoryId: searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined,
    author: searchParams.get('author') ? Number(searchParams.get('author')) : undefined,
    publishers: searchParams.get('publishers') ? Number(searchParams.get('publishers')) : undefined,
    sortBy: searchParams.get('sortBy') ?? undefined,

  });

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const params = new URLSearchParams();
    if (filters.categoryId != null) params.set('categoryId', String(filters.categoryId));
    if (filters.author != null) params.set('author', String(filters.author));
    if (filters.publishers != null) params.set('publishers', String(filters.publishers));
    if (filters.sortBy) params.set('sortBy', filters.sortBy);


    const url = `${pathname}?${params.toString()}`;
    const current = window.location.pathname + window.location.search;
    if (url !== current) router.push(url, { scroll: false });

  }, [filters, pathname, router]);

  useEffect(() => {
    const newFilters: IFilters = {
      categoryId: searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined,
      author: searchParams.get('author') ? Number(searchParams.get('author')) : undefined,
      publishers: searchParams.get('publishers') ? Number(searchParams.get('publishers')) : undefined,
      sortBy: searchParams.get('sortBy') ?? undefined,
    };

    setFilters(prev => {
      if (
        prev.categoryId !== newFilters.categoryId ||
        prev.author !== newFilters.author ||
        prev.sortBy !== newFilters.sortBy ||
        prev.publishers !== newFilters.publishers
      ) {
        return newFilters;
      }
      return prev;
    });
  }, [searchParams]);

  return { filters, setFilters };
};
