const { createServer } = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const httpServer = createServer();

const io = new Server(httpServer, {
  path: "/socket_io",
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("[SERVER] Socket connected:", socket.id);

  socket.on("message", async ({ chatId, content, userId, token, adminId }) => {
    if (!content?.trim()) return;

    console.log("[SERVER] Received message:", { chatId, content, userId, token, adminId });

    try {
      let chat = null;

      if (!chatId) {
        if (!userId && token) {
          chat = await prisma.chat.findUnique({ where: { token } });
        } else if (userId) {
          chat = await prisma.chat.findUnique({ where: { userId } });
        }

        if (!chat) {
          chat = await prisma.chat.create({
            data: {
              userId: userId || null,
              token: userId ? null : token || null,
              status: "AVAILABLE",
              messages: {
                create: {
                  senderId: userId || null,
                  token: userId ? null : token || null,
                  content,
                },
              },
            },
            include: { messages: true },
          });

          console.log("[SERVER] New chat created:", chat.id);

          socket.join(chat.id.toString());
          socket.emit("message", { messages: chat.messages, chatId: chat.id });
        } else {
          const message = await prisma.message.create({
            data: {
              chatId: chat.id,
              senderId: userId || null,
              token: userId ? null : token || null,
              content,
            },
          });
          socket.join(chat.id.toString());
          socket.emit("message", message);
        }
      } else {
        chat = await prisma.chat.findUnique({ where: { id: chatId } });
        if (!chat) return;

        if (adminId && chat.status === "AVAILABLE") {
          await prisma.chat.update({
            where: { id: chatId },
            data: { adminId, status: "OCCUPIED" },
          });
          console.log(`[SERVER] Admin ${adminId} перехопив chat ${chatId}`);
        }

        const message = await prisma.message.create({
          data: {
            chatId,
            senderId: userId || adminId,
            content,
            token: userId ? null : token || null,
          },
        });

        console.log("[SERVER] Emitting message:", { chatId, sender: userId || adminId, content });

        socket.join(chatId.toString());
        io.to(chatId.toString()).emit("message", message);
      }
    } catch (err) {
      console.error("[SERVER] Error handling message:", err);
    }
  });

  socket.on("join_chat", async ({ chatId, adminId }) => {
    if (!chatId) {
      console.error("[SERVER] join_chat called without chatId");
      return;
    }
    socket.join(chatId.toString());
    console.log(`[SERVER] Admin ${adminId} joined chat ${chatId}`);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

httpServer.listen(process.env.PORT || 4000, () => console.log("Working!"));