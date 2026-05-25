import { IFilters } from "shared/hooks/use-filter";
import { Author, Category, Publisher } from "@prisma/client";
import { prisma } from "../../prisma/prisma-client";
import {
  BookDetalisedWithDiscount,
  applyDiscountToBook,
  applyDiscountToBooks,
} from "shared/lib/calc-discount";

export const getAllBooks = async () => {
  return prisma.book.findMany({
    include: {
      author: true,
    },
  });
};

export const getBookById = async (id: number): Promise<BookDetalisedWithDiscount | null> => {
  const book = await prisma.book.findFirst({
    where: { id },
    include: {
      items: true,
      author: true,
      comments: { include: { user: true } },
      publisher: true,
      category: true,
    },
  });

  if (!book) return null;

  return applyDiscountToBook(book);
};

export const findBooks = async (filters: IFilters): Promise<BookDetalisedWithDiscount[]> => {
  const categoryId = filters.categoryId ? Number(filters.categoryId) : undefined;
  const authorId = filters.author ? Number(filters.author) : undefined;
  const publisherId = filters.publishers ? Number(filters.publishers) : undefined;

  const sortDirection = filters.sortBy?.startsWith("-") ? "desc" : "asc";
  const sortField = filters.sortBy?.replace("-", "") || "title";

  const books = await prisma.book.findMany({
    where: {
      ...(categoryId ? { categoryId } : {}),
      ...(authorId ? { authorId } : {}),
      ...(publisherId ? { publisherId } : {}),
    },
    include: {
      author: true,
      items: true,
      publisher: true,
      category: true,
      comments: { include: { user: true } },
    },
    orderBy: { [sortField]: sortDirection as "asc" | "desc" },
  });

  return applyDiscountToBooks(books);
};

export const recommendedBooks = async (categoryId: number, bookId?: number) => {
  const bookList = await prisma.book.findMany({
    where: { categoryId, NOT: { id: bookId } },
    include: {
      author: true,
      items: true,
      publisher: true,
      category: true,
      comments: { include: { user: true } },
    },
    take: 4,
  });

  return applyDiscountToBooks(bookList);
};

export const getCategories = async (): Promise<Category[]> => {
  const categories = await prisma.category.findMany();
  return categories;
};

export const getAuthors = async (): Promise<Author[]> => {
  const author = await prisma.author.findMany();
  return author;
};

export const getPublishers = async (): Promise<Publisher[]> => {
  const publisher = await prisma.publisher.findMany();
  return publisher;
};
