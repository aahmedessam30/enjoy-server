import { api, reqTest } from "../../../services/reqTest"
const baseUrl = `${api(__dirname)}/`

describe(`GET Stats`, function () {
  it("Properties", async function () {
    const response = await reqTest.get(`${baseUrl}/stats/properties/all`).set("Authorization", global.oldToken)
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
  it("Users", async function () {
    const response = await reqTest.get(`${baseUrl}/stats/users/all`).set("Authorization", global.oldToken)
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})
