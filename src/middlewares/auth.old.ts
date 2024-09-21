import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { User } from "../db"
import { jwtConfig } from "../config"
import { UserRole } from "../interfaces/user.interface"

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  authorization(req.get("Authorization"), [UserRole.ADMIN])
    .then((data: any) => {
      req.userId = data.userId
      next()
    })
    .catch((err) => {
      res.status(401).json({ message: err, errors: [] })
    })
}

export function isAuth(req: Request, res: Response, next: NextFunction) {
  authorization(req.get("Authorization"), [UserRole.GUEST])
    .then((data: any) => {
      req.userId = data.userId
      next()
    })
    .catch((err) => {
      res.status(401).json({ message: err, errors: [] })
    })
}

export function isQueryAuth(req: Request, res: Response, next: NextFunction) {
  authorization(`Bearer ${req.query?.authorization}`, [UserRole.GUEST])
    .then((data: any) => {
      req.userId = data.userId
      next()
    })
    .catch((err) => {
      res.status(401).json({ message: err, errors: [] })
    })
}

export function isHostAuth (req: Request, res: Response, next: NextFunction) {
  authorization(req.get("Authorization"), [UserRole.HOST])
    .then((data: any) => {
      req.userId = data.userId
      next()
    })
    .catch((err) => {
      res.status(401).json({ message: err, errors: [] })
    })
}

function authorization(bearerToken: string, roles: string[] = []) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!bearerToken) {
        reject("Not authorized.!!")
      }
      const token = bearerToken.split(" ")[1]
      let decodedToken: any
      try {
        decodedToken = jwt.verify(token, jwtConfig.SECRETKEY)
      } catch (e) {
        reject("Not authorized.!")
      }
      if (!decodedToken) {
        reject("Not authorized.!")
      }
      User.findByPk(decodedToken.userId, { attributes: ["id", "role", "status"] })
        .then((user) => {
          if (user.status != "ACTIVE") {
            reject("Your account is unavailable.!")
          } else if (roles.length > 0 && !roles.includes(user.role)) {
            reject("You are not authorized for this service.!")
          }
          resolve(decodedToken)
        })
        .catch(() => {
          reject("Error in get your account.!")
        })
    } catch (err) {
      reject("Not authorized.!")
    }
  })
}
