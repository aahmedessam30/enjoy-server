import { appConfig } from "./config"
import compression from "compression"
import helmet from "helmet"
import cors from "cors"
import sequelize from "./models"
import { i18nApply } from "./middlewares/i18n.middleware"
import rootRouter from "./rootRouter"
// import * as db from "./db"
import { createServer, Server as HTTPServer } from "http"
import { Server as SocketIOServer } from "socket.io"
import express, { Application, Response, Request } from "express"
import Socket from "./socket"

export class App {
  private httpServer: HTTPServer
  public app: Application
  private io: SocketIOServer
  private readonly port = appConfig.port

  constructor() {
    this.initialize()
    this.handleRoutes()
    this.handleSocketConnection()
  }

  private initialize(): void {
    this.app = express()
    this.httpServer = createServer(this.app)
    this.io = new SocketIOServer(this.httpServer, { cors: { origin: "*" } })
    // startCrons()
  }

  private handleRoutes(): void {
    this.app.use(cors())
    this.app.use(express.json()) // parse json request body
    this.app.use(express.urlencoded({ extended: true })) // parse urlencoded request body
    this.app.use(compression())
    this.app.use(helmet())
    this.app.use(i18nApply)
    rootRouter(this.app)
    this.app.use((error: any, req: Request, res: Response, next: () => void) => {
      const status = error.statusCode || 500
      const message = error.message
      const errors = error.errors || []
      res.status(status).json({ message: message, errors: errors })
    })
  }

  private handleSocketConnection(): void {
    global.globalIo = this.io
    new Socket()
  }

  public listen(callback: (port: number) => void): void {
    this.httpServer.listen(this.port, () => callback(this.port))
  }
}

// // Sync DB.
// (async () => {
// 	try {
//     await sequelize.sync({ alter: true });
//     console.log('sync finished');
// 	} catch (e) {
// 		console.log(e);
// 	}
// })();
