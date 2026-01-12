import { BookItem } from "@prisma/client";
import { bookLanguages, BookFormat } from "constants/book";

export interface Variant {
    name: string;
    value: number;
    isDisabled?: boolean;
}

export const getAvailiableBookType = (items: BookItem[], format: BookFormat): Variant[] => {
  const uniqueLanguages = Array.from(new Set(items.map(i => i.language)));

  return uniqueLanguages.map((lang) => {
    const langName = bookLanguages.find(b => b.value === lang)?.name || String(lang);

    return {
      value: lang,
      name: langName,
      isDisabled: !items.some(i => i.format === format && i.language === lang),
    };
  });
};
