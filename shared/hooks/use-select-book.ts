// useSelectBook.ts
'use client'

import { useState, useMemo, useEffect } from "react";
import { BookItemWithDiscount } from "prisma/types";
import { getAvailiableBookType } from "../lib/get-availiable-book-type";
import { bookFormats, BookFormat, BookLanguage } from "constants/book";

export const useSelectBook = (items: BookItemWithDiscount[]): ISelectBook => {
  const availableFormats = useMemo(() => {
    const formatsSet = new Set(items.map(item => item.format));
    return bookFormats.filter(f => formatsSet.has(f.value));
  }, [items]);

  const [format, setFormat] = useState<BookFormat>(availableFormats[0]?.value as BookFormat);
  const availableLanguages = useMemo(
    () => getAvailiableBookType(items, format),
    [items, format]
  );
  const [language, setLanguage] = useState<BookLanguage>(availableLanguages[0]?.value as BookLanguage ?? 1);

  const [currentBook, setCurrentBook] = useState<BookItemWithDiscount | null>(null);

  useEffect(() => {
    const book = items.find(i => i.format === format && i.language === language);
    setCurrentBook(book ?? null);
  }, [items, format, language]);

  useEffect(() => {
    if (!items.some(i => i.format === format && i.language === language)) {
      const firstBookForFormat = items.find(i => i.format === format);
      if (firstBookForFormat) {
        setLanguage(firstBookForFormat.language as BookLanguage);
      }
    }
  }, [items, format, language]);

  return {
    format,
    setFormat,
    language,
    setLanguage,
    availableLanguages,
    availableFormats,
    currentBook,
  };
};

export interface ISelectBook {
  format: BookFormat;
  setFormat: (format: BookFormat) => void;
  language: BookLanguage;
  setLanguage: (language: BookLanguage) => void;
  availableLanguages: { name: string; value: number }[];
  availableFormats: { name: string; value: number }[];
  currentBook: BookItemWithDiscount | null;
}
