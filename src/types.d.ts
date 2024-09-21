import { Server as SocketIOServer } from "socket.io"

declare global {
  var globalIo: SocketIOServer
  namespace Express {
    interface Request {
      userId?: string;
      lang?: lang;
    }
  }
  type lang = "en" | "ar" | 'fr'
}
