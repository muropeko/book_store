import { BookItem, CartItem } from "@prisma/client";
import { BookFormat, BookLanguage, mapBookFormat, mapBookLanguage } from "../constants/book";
import { authors, books, categories, chats, comments, messages, publishers, users } from "./constants";
import { prisma } from "./prisma-client";
import bcrypt from 'bcryptjs';


const items = [
  { bookItemId: 1, quantity: 1 },
  { bookItemId: 6, quantity: 2 }
];

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
  const hashedUsers = await Promise.all(
    users.map(async (u) => ({
      ...u,
      password: await bcrypt.hash(u.password, 10),
    }))
  );

  await prisma.user.createMany({
    data: hashedUsers
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

    await prisma.comment.createMany({
      data: comments
    })

    const book1 = generateBookItem({bookId: 1, bookItemQuantity: 3});
    const book2 = generateBookItem({bookId: 2, bookItemQuantity: 2});
    const book3 = generateBookItem({bookId: 3, bookItemQuantity: 4});
    const book4 = generateBookItem({bookId: 4, bookItemQuantity: 5});
    const book5 = generateBookItem({bookId: 5, bookItemQuantity: 4});
    const book6 = generateBookItem({bookId: 6, bookItemQuantity: 1});
    const book7 = generateBookItem({bookId: 7, bookItemQuantity: 2});
    const book8 = generateBookItem({bookId: 8, bookItemQuantity: 4});
    const book9 = generateBookItem({bookId: 9, bookItemQuantity: 1});
    const book10 = generateBookItem({bookId: 10, bookItemQuantity: 2});
    const book11 = generateBookItem({bookId: 11, bookItemQuantity: 3});

    await prisma.bookItem.createMany({
      data: [...book1, ...book2, ...book3, ...book4, ...book5, ...book6, ...book7, ...book8, ...book9, ...book10, ...book11]
    })


    const bookItems = await prisma.bookItem.findMany({
      where: { id: { in: items.map(i => i.bookItemId) } },
      select: { id: true, price: true }
    });

    const totalAmount = items.reduce((sum, item) => {
      const book = bookItems.find(b => b.id === item.bookItemId);
      if (!book) throw new Error(`нема ${item.bookItemId}`);
      return sum + (item.quantity ?? 1) * book.price;
    }, 0);

    await prisma.cart.create({
      data: {
        userId: 2,
        items: {
          create: items
        },
        totalAmount
      }
    })


    
    await prisma.chat.createMany({
      data: chats
    })

    await prisma.message.createMany({
      data: messages
    }) 
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Author" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Publisher" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Comment" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Book" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "BookItem" RESTART IDENTITY CASCADE`;

    await prisma.$executeRaw`TRUNCATE TABLE "Message" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Chat" RESTART IDENTITY CASCADE`;
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