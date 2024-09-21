import { api, reqTest } from "../../../services/reqTest"
const baseUrl = `${api(__dirname)}/bookmark`

describe(`POST Add bookmark`, function () {
  it("Add PROPERTY dummy", async function () {
    const response = await reqTest.post(`${baseUrl}/`).send({ type: "PROPERTY", id: "111111111" }).set("Authorization", global.oldToken)
    expect(response.status).toEqual(404)
  })

  it("Add PORTION dummy", async function () {
    const response = await reqTest
      .post(`${baseUrl}/`)
      .send({ type: "PORTION", id: "f2e575e1-8e60-4c51-acd7-cd42b183b869" })
      .set("Authorization", global.oldToken)
    expect(response.status).toEqual(404)
  })

  it("Check validate", async function () {
    const response = await reqTest.post(`${baseUrl}/`).send({ type: "fack", id: 123456 }).set("Authorization", global.oldToken)
    expect(response.status).toEqual(422)
  })
})

describe(`GET bookmark`, function () {
  it("portions", async function () {
    const response = await reqTest.get(`${baseUrl}/portions`).set("Authorization", global.oldToken)
    expect(response.status).toEqual(200)
    expect(response.body.payload.portions).toBeDefined()
  })

  it("properties", async function () {
    const response = await reqTest.get(`${baseUrl}/properties`).set("Authorization", global.oldToken)
    expect(response.status).toEqual(200)
    expect(response.body.payload.properties).toBeDefined()
  })
})
