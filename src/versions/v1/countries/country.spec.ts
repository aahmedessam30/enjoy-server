import { api, reqTest } from "../../../services/reqTest"
const baseUrl = `${api(__dirname)}/countries`

let countryBody: any = {
  nameAr: "test",
  nameEn: "test",
  code: "test",
}

describe(`POST create country`, function () {
  it("Create", async function () {
    const response = await reqTest.post(`${baseUrl}/`).send(countryBody).set("Authorization", global.oldToken)
    expect(response.status).toEqual(201)
    countryBody.id = response.body.payload.country.id
  })
})

describe(`PATCH update country`, function () {
  it("update", async function () {
    const response = await reqTest.patch(`${baseUrl}/${countryBody.id}`).send(countryBody).set("Authorization", global.oldToken)
    expect(response.status).toEqual(201)
  })
})

describe(`GET list countries <User>`, function () {
  it("List of countries", async function () {
    const response = await reqTest.get(`${baseUrl}`).set("Accept", "application/json")
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})

describe(`GET list countries <dashboard>`, function () {
  it("List of countries", async function () {
    const response = await reqTest.get(`${baseUrl}/dashboard`).set("Accept", "application/json")
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})
