/**
 * - this module will be used to securely generate and verify
 *   json web tokens to provide authrized data access.
 */
import jwt from "jsonwebtoken"
import { readFileSyncHelper } from "./helper"

interface IRS256Keys {
  private: string
  public: string
}

interface ITokenPayload {
  userId: number
  phone: string
}

const refreshTokenKeys: IRS256Keys = {
  private: readFileSyncHelper("../../assets/keys/refresh-token/private.key"),
  public: readFileSyncHelper("../../assets/keys/refresh-token/public.key"),
}
const accessTokenKeys: IRS256Keys = {
  private: readFileSyncHelper("../../assets/keys/access-token/private.key"),
  public: readFileSyncHelper("../../assets/keys/access-token/public.key"),
}

/**
 * this generate refresh token by algorithms [RS256] and Token Expiration 60 days
 * @param payload
 * @returns
 */
function generateRefreshToken(payload: ITokenPayload) {
  return jwt.sign(payload, refreshTokenKeys.private, { algorithm: "RS256", expiresIn: "60 days" })
}

/**
 * this generate access token by algorithms [RS256] and Token Expiration 7 days
 * @param payload
 * @returns
 */
function generateAccessToken(payload: ITokenPayload) {
  return jwt.sign(payload, accessTokenKeys.private, { algorithm: "RS256", expiresIn: "7 days" })
}

/**
 * this function verify refresh token
 * @param token
 * @returns
 */
function verifyRefreshToken(token: string): Promise<ITokenPayload> {
  return new Promise(async (resolve, reject) => {
    try {
      const decoded: any = jwt.verify(token, refreshTokenKeys.public, { algorithms: ["RS256"] })
      resolve(decoded)
    } catch (ex) {
      reject({ becauseItExpired: ex.message == "jwt expired", message: ex.message })
    }
  })
}
/**
 * this function verify refresh token
 * @param token
 * @returns
 */
function verifyAccessToken(token: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const decoded = jwt.verify(token, accessTokenKeys.public, { algorithms: ["RS256"] })
      resolve(decoded)
    } catch (ex) {
      reject({ becauseItExpired: ex.message == "jwt expired", message: ex.message })
    }
  })
}

export { generateRefreshToken, generateAccessToken, verifyRefreshToken, verifyAccessToken, ITokenPayload }
