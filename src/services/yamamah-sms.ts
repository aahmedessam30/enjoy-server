import request from "request"
import { yamamahConfig } from "../config"

class YamamahSMS {
  API_URL: string
  constructor() {
    this.API_URL = "https://api.yamamah.com/SendSMSV2"
  }

  async send({ to, body }) {
    try {
      const username = yamamahConfig.username
      const password = yamamahConfig.password
      const tagname = yamamahConfig.tagname
      const FULL_URL = `${this.API_URL}?username=${username}&password=${password}&Tagname=${tagname}&RecepientNumber=966${to}&Message=${body}&SendDateTime=0&EnableDR=true&SentMessageID=true`
      request(FULL_URL, (error, response, body) => {
        if (!error && response && response.statusCode === 200) {
          return "success"
        }
      })
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default YamamahSMS
