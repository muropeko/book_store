import { Server as IOServer } from "socket.io"

let io: IOServer | undefined

export async function GET(req: any, res: any) {
  if (!(res?.socket?.server?.io)) {
    console.log("Starting Socket.io server...")

    io = new IOServer(res.socket.server, {
      path: "/api/socket_io",
    })

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id)

      socket.on("message", (msg: string) => {
        io?.emit("message", msg)
      })
    })

    res.socket.server.io = io
  }

  res.end()
}
