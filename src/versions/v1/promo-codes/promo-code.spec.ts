import { api, reqTest } from "../../../services/reqTest"
const baseUrl = `${api(__dirname)}/`

describe(`GET verify promo`, function () {
  it("verify", async function () {
    const response = await reqTest.get(`${baseUrl}promo-codes/Test&rrr?type=PACKAGES`).set("Authorization", global.oldToken)
    expect(response.status).toEqual(404)
  })
})

describe(`GET list promo for dashboard`, function () {
  it("list", async function () {
    const response = await reqTest.get(`${baseUrl}promo/dashboard`).set("Authorization", global.oldToken)
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})

describe(`GET search promo for dashboard`, function () {
  it("search", async function () {
    const response = await reqTest.get(`${baseUrl}dashboard/promo/search?s=f`).set("Authorization", global.oldToken)
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})
