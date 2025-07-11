import { BookItem } from "@prisma/client";
import { BookFormat, BookLanguage, mapBookFormat, mapBookLanguage } from "../constants/book";
import { authors, books, categories, publishers } from "./constants";
import { prisma } from "./prisma-client";

type BookItemCreateInput = {
  bookId: number;
  format: number;
  language: number;
  isbn: string;
  price: number;
  stock: number;
};

export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const randomISBN = (): string => {
  return `${Math.floor(1000000000 + Math.random() * 9000000000)}`
};


export const generateBookItem = ({
  bookId,
  bookItemQuantity,
}: {
  bookId: number;
  bookItemQuantity: number;
}) => {
  const results: BookItemCreateInput[] = [];

  const formatQuantity = Object.keys(mapBookFormat).length;
  const languageQuantity = Object.keys(mapBookLanguage).length;

  while (results.length < bookItemQuantity) {
    const randomFormat = Math.floor(Math.random() * formatQuantity) + 1;
    const randomLanguage = Math.floor(Math.random() * languageQuantity) + 1;

    const exists = results.some(item => item.format === randomFormat && item.language === randomLanguage);

    if (!exists) {
      results.push({
        bookId,
        format: randomFormat,
        language: randomLanguage,
        isbn: randomISBN(),
        price: randomInt(100, 1000),
        stock: randomInt(1, 25),
      });
    }
  }

  return results;
};


async function up() {
    await prisma.user.createMany({
         data: [
            {
            firstName: "Тестовий",
            lastName: "Користувач",
            login: "user",
            email: "user@gmail.com",
            password: "user123",
            role: 'USER',
            },
            {
            firstName: "Анастасія",
            lastName: "Довгошия",
            login: "admin",
            email: "admin@gmail.com",
            password: "admin",
            role: 'ADMIN',
            },
        ],
    })

    await prisma.category.createMany({
      data: categories
    })

    await prisma.author.createMany({
      data: authors
    })

    await prisma.publisher.createMany({
      data: publishers
    })

    await prisma.book.createMany({
      data: books
    })

    const book1 = generateBookItem({bookId: 1, bookItemQuantity: 5});
    const book2 = generateBookItem({bookId: 2, bookItemQuantity: 6});
    const book3 = generateBookItem({bookId: 3, bookItemQuantity: 7});
    const book4 = generateBookItem({bookId: 4, bookItemQuantity: 5});
    const book5 = generateBookItem({bookId: 5, bookItemQuantity: 4});


    await prisma.bookItem.createMany({
      data: [...book1, ...book2, ...book3, ...book4, ...book5]
    })

}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Author" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Publisher" RESTART IDENTITY CASCADE`;



}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });