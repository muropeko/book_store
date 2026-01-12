export class WSClient {
  ws: WebSocket;
  constructor(url: string) {
    this.ws = new WebSocket(url);
  }

  sendMessage(msg: { chatId?: number; content: string }) {
    this.ws.send(JSON.stringify(msg));
  }

  onMessage(cb: (data: any) => void) {
    this.ws.onmessage = (e) => cb(JSON.parse(e.data));
  }
}
