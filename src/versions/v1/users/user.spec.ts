import { api, reqTest } from "../../../services/reqTest"
const baseUrl = `${api(__dirname)}/`

describe(`POST Login`, function () {
  const loginBody = {
    mobile: "1231231234",
    password: "@##<MNNNB>hhhh",
  }
  it("Login for user", async function () {
    const response = await reqTest.post(`${baseUrl}login`).send(loginBody)
    expect(response.status).toEqual(422)
  })
  it("Login for dashboard", async function () {
    const response = await reqTest.post(`${baseUrl}dashboard/login`).send(loginBody)
    expect(response.status).toEqual(422)
  })
})
describe(`POST Verify OTP`, function () {
  const loginBody = {
    phone: "123123123456",
    otp: "1234",
  }
  it("Verify", async function () {
    const response = await reqTest.post(`${baseUrl}otp`).send(loginBody)
    expect(response.status).toEqual(404)
  })
})

describe(`GET user by token`, function () {
  it("user", async function () {
    const response = await reqTest.get(`${baseUrl}users`).set("Authorization", global.oldToken)
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})
describe(`GET user <me>`, function () {
  it("me", async function () {
    const response = await reqTest.get(`${baseUrl}dashboard/me`).set("Authorization", global.oldToken)
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})
describe(`GET user for dashboard`, function () {
  it("users", async function () {
    const response = await reqTest.get(`${baseUrl}dashboard/users`).set("Authorization", global.oldToken)
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})
describe(`GET user stats`, function () {
  it("users", async function () {
    const response = await reqTest.get(`${baseUrl}userStats`).set("Authorization", global.oldToken)
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})
