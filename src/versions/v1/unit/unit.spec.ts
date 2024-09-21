import { api, reqTest } from "../../../services/reqTest"
import UnitProvider from "./unit.provider";

const Unit = new UnitProvider()
const baseUrl = `${api(__dirname)}/units`

describe(`GET list properties`, function () {
  it("List of properties", async function () {
    const response = await reqTest.get(`${baseUrl}/list`).set("Accept", "application/json")
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})

describe(`GET list properties </web>`, function () {
  it("List", async function () {
    const response = await reqTest.get(`${baseUrl}/web`).set("Accept", "application/json")
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})

describe(`GET list properties </public>`, function () {
  it("List", async function () {
    const response = await reqTest.get(`${baseUrl}/public`).set("Accept", "application/json")
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})

describe(`GET list properties </featured>`, function () {
  it("List", async function () {
    const response = await reqTest.get(`${baseUrl}/featured`).set("Accept", "application/json")
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})
