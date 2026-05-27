# Book Store

Full-stack bookstore application with real-time customer support chat.

**Live:** https://book-store-five-taupe-62.vercel.app/

## Prerequisites

- Node.js 18+

## Installation

```bash
git clone https://github.com/muropeko/book_store.git
cd book_store
npm install
```

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

All values are pre-filled and ready to use.

## Running Locally

```bash
npx prisma generate
npm run dev
```

Open `http://localhost:3000`.

The Socket.io server is already deployed and does not require local setup.
