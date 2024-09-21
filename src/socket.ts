import { instrument } from "@socket.io/admin-ui"
import { Socket as v4 } from "./versions/v1/socket"

class Socket {
  constructor() {
    new v4()
    this.admin()
  }

  admin() {
    instrument(globalIo, {
      auth: {
        type: "basic",
        username: "admin",
        password: "$2b$10$6PsM/c599sw2W5wXx4ewkuQ.eDu/3ryqejfgSLVUc06gOF51/YJnq",
      },
    })
  }
}

export const socketVersions = ["v4"]

export default Socket
