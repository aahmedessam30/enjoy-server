import jwt from "jsonwebtoken"
import path from "path"
import { jwtConfig } from "../../../config"
import { socketVersions } from "../../../socket"
import events from "./events.socket"

export class Socket {
  io = globalIo
  version = `/${path.basename(path.dirname(__dirname))}`
  constructor() {
    this.connection()
  }
  /**
   * connection handler
   */
  private connection() {
    const connection = this.io.of(`${this.version}`).setMaxListeners(0)
    connection.use(this.socketAuth).on("connection", (socket) => events(socket.setMaxListeners(0), connection))
  }
  /**
   * Socket Authorization with token
   * @param socket
   * @param next
   */
  private socketAuth(socket: any, next) {
    try {
      const Authorization = socket.handshake.query.Authorization
      if (!Authorization) next()
      const decoded: any = jwt.verify(Authorization, jwtConfig.SECRETKEY)
      socket.userId = decoded.userId
      next()
    } catch (e) {
      next()
    }
  }
  /**
   * To emit using socket io
   * @param {*} event socket event
   * @param {*} room Array of rooms
   * @param {*} data {}
   */
  send(event: string, room: string[], data: object) {
    socketVersions.forEach((v) => this.io.of(`/${v}`).to(room).emit(event, data))
  }
}
