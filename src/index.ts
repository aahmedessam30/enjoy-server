import { App } from "./app"

new App().listen((port) => {
  console.log("Server is running on port : ", port)
})
