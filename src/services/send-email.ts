import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path"
import { emailConfig } from "../config"
import { User, SendEmail } from "../db"
import { EmailStatus } from "../interfaces/send-email.interface"

export default class Email {
  /**
   * @function sendEmail  Sends an email using nodemailer & handlebars
   * @param to            Comma separated list or an array of recipients email addresses that will appear on the To: field
   * @param subject       The subject of the email
   * @param lang          language of mail ( ar - en )
   * @param template      The name file template is constent HTML (templates => type .hbs)
   * @param context       {} variable in template ex: {{name}}
   * @param cc            Comma separated list or an array of recipients email addresses that will appear on the Cc: field
   * @param bcc           Comma separated list or an array of recipients email addresses that will appear on the Bcc: field
   * @returns             Promise<>
   */
  send(to: string[], subject: string, lang: lang = "fr", template: string, context?: object, cc?: string[], bcc?: string[]) {
    return new Promise((resolve, reject) => {
      if (to.length < 1) return reject({ error: { message: "can not send email to unknown or undefined value" } })
      const transporter = nodemailer.createTransport(emailConfig)
      transporter.use("compile", hbs(this.hbsOptions(lang)))
      const mail = {
        from: `Darkkom <${emailConfig.auth.user}>`,
        to,
        subject,
        template,
        context,
        cc,
        bcc,
      }
      transporter
        .sendMail(mail)
        .then((result) => {
          storeEmail(result, template, subject, context)
          return resolve(result)
        })
        .catch((error) => {
          transporter.close()
          return reject({ mail: error })
        })
    })
  }
  async sendUserId(userId: number, subject: string, lang: lang = "ar", template: string, args?: object, cc?: string[], bcc?: string[]) {
    try {
      const userMail = await User.findByPk(userId, { attributes: ["email"] })
      this.send([userMail.email], subject, lang, template, args, cc, bcc).catch((e) => console.log(e))
    } catch (e) {
      console.log(e)
    }
  }
  private hbsOptions(lang: lang) {
    return {
      viewEngine: {
        extname: ".hbs",
        layoutsDir: path.join(__dirname, `../../assets/email-template/${lang}`),
        partialsDir: path.join(__dirname, `../../assets/email-template/${lang}/partials`),
        defaultLayout: "",
      },
      viewPath: path.join(__dirname, `../../assets/email-template/${lang}`),
      extName: ".hbs",
    }
  }
}

function storeEmail(result, template: string, subject: string, context?: object) {
  try {
    const acceptedUsers = result.accepted.map((email) => {
      return { email, template, subject, context, status: EmailStatus.ACCEPTED }
    })
    const rejectedUsers = result.rejected.map((email) => {
      return { email, template, subject, context, status: EmailStatus.REJECTED }
    })
    SendEmail.bulkCreate([...acceptedUsers, ...rejectedUsers])
  } catch (error) {}
}

// const Email = require('./services/send-email')
// const sendEmail = new Email()
// sendEmail.send([""], "Welcome", "ar", "welcome", {"userName":"محمد"})
// 	.then((d) => {
// 		console.log(d)
// 	})
// 	.catch((e) => {
// 		console.log(e)
// 	})
// m.helmy@darkkom.com
