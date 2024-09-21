import { api, reqTest } from "../../../services/reqTest"
import CityProvider from "./city.provider"

const cityProvider = new CityProvider()
const baseUrl = `${api(__dirname)}/`

let cityBody: any = {
  nameAr: "test",
  nameEn: "test",
  lng: "30.30",
  lat: "30.30",
}

describe(`POST create city`, function () {
  it("Create", async function () {
    const response = await reqTest.post(`${baseUrl}/dashboard/cities`).send(cityBody).set("Authorization", global.oldToken)
    expect(response.status).toEqual(201)
    cityBody.id = response.body.payload.city.id
  })
})

describe(`PATCH update city`, function () {
  it("update", async function () {
    const response = await reqTest.patch(`${baseUrl}/dashboard/cities/${cityBody.id}`).send(cityBody).set("Authorization", global.oldToken)
    expect(response.status).toEqual(201)
  })
})

describe(`GET list cities <User>`, function () {
  it("List of cities", async function () {
    const response = await reqTest.get(`${baseUrl}cities`).set("Accept", "application/json")
    expect(response.status).toEqual(200)
    expect(response.body.payload).toBeDefined()
  })
})

describe(`GET list cities <dashboard>`, function () {
  it("check auth", async function () {
    const response = await reqTest.get(`${baseUrl}dashboard/cities`).set("Accept", "application/json")
    expect(response.status).toEqual(401)
  })
  it("Check body", async function () {
    const response: any = await cityProvider.getDashboardCities({ currentPage: 0, perPage: 10 })
    expect(response.result.payload).toBeDefined()
  })
})
