import { NextRequest } from "next/server";
import { WebSocketServer } from "ws";

let wss: WebSocketServer;

export const GET = async (req: NextRequest) => {
  if (!wss) {
    wss = new WebSocketServer({ noServer: true });

    wss.on("connection", (ws) => {
      console.log("[WS] New connection");

      ws.on("message", (msg) => {
        console.log("[WS] Received:", msg.toString());

        wss.clients.forEach((client) => {
          if (client.readyState === 1) client.send(msg.toString());
        });
      });
    });
  }

  return new Response("WebSocket initialized");
};
