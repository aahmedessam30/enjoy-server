//Business logic for OPT
import SMSClient from '../../../../services/sms';
import { GenerateError } from "../../../../services/services"
import { OTP, User } from "../../../../db"
import MainProvider from "../../index.provider";
import { SMSConfig } from "../../../../config"

export default class OTPProvider extends MainProvider {
  private smsClient = new SMSClient(SMSConfig.key, SMSConfig.secret);
  constructor() {
    super("user");
  }

  genrateOTP() {
    return Math.floor(1000 + Math.random() * 9000)
  }

  genrateRandomPassword() {
    return Math.floor(100000 + Math.random() * 900000)
  }

  async saveOTP({ mobile }) {
    try {
      // const code = this.genrateOTP();
      const code = 2030
      const userOTP = await OTP.findOne({ where: {mobile: mobile} })
      if (!userOTP) {
        const otp = await OTP.create({
          mobile: mobile,
          code: code,
        })
        //TODO: Send OTP WITH SMS
        // this.smsClient.sendMessage(`Enjoy: verify code: ${code}`, [mobile], 'Enjoy App').then((response) => {
        //   console.log(response); // This will log the response from the sendMessage function
        // });
        return { otp }
      }
      userOTP.code = code;
      const result = await userOTP.save()
      //TODO: Send OTP WITH SMS
      // this.smsClient.sendMessage(`Enjoy: verify code: ${code}`, [mobile], 'Enjoy App').then((response) => {
      //   console.log(response); // This will log the response from the sendMessage function
      // });
      return { otp: result }
    } catch (error) {
      throw error
    }
  }

  async verifyOTP({ mobile, otp }) {
    const user = await OTP.findOne({ where: { mobile: mobile } })
    if (!user) {
      GenerateError({ message: this._i18n("invalidOTP"), code: 404 })
    }
    // const isExired -> TODO to check code expiration.
    if (!(user?.code == otp)) {
      GenerateError({ message: this._i18n("invalidOTP"), code: 404 })
    }
    return { otp: user }
  }

  async forgetPassword({ mobile }) {
    this.saveOTP({mobile})
  }
}
