import { api, reqTest } from "../../../services/reqTest"
const baseUrl = `${api(__dirname)}/`

describe(`GET categories`, function () {
  it("list user", async function () {
    const response = await reqTest.get(`${baseUrl}categories`)
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
  it("list Admin", async function () {
    const response = await reqTest.get(`${baseUrl}dashboard/categories`).set("Authorization", global.oldToken)
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})

describe(`GET categories-filters`, function () {
  it("list", async function () {
    const response = await reqTest.get(`${baseUrl}categories-filters`)
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})
