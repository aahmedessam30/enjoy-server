import path from "path"
import supertest from "supertest"
import { App } from "../app"

export const reqTest = supertest(new App().app)

export const api = (dir: string): string => {
  return "/api/" + path.basename(path.dirname(dir))
}
