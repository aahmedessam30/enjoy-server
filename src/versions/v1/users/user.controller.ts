import { Request, Response, NextFunction } from "express"
import { CatchError } from "../../../services/services"
import UserProvider from "./user.provider"
import OTPProvider from "./otps/otp.provider"
import { LoginDto } from "./dtos/login.dto"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UserRole } from "../../../interfaces/user.interface"
import { UpdateUserDto } from "./dtos/update-user.dto"

const User = new UserProvider()
const OTP = new OTPProvider()

export default class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = await User.getUser({ userId: req.userId })
      res.status(200).json({ message: "fetched success", payload: { user }, status: "success" })
    } catch (e) {
      CatchError(e, next)
    }
  }

  async getUserForAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = await User.getUser({ userId: req?.params?.userId })
      res.status(200).json({ payload: { user }, status: "success" })
    } catch (e) {
      CatchError(e, next)
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const filter = req.query.filter || null
      const { result } = await User.getUsers({
        type: req.query.type,
        filter,
        perPage: Number(req.query.perPage) || 16,
        currentPage: Number(req.query.page) || 0,
      })
      res.status(200).json(result)
    } catch (e) {
      CatchError(e, next)
    }
  }

  async loginAsGuest (req: Request, res: Response, next: NextFunction) {
    try {
      const loginDto: LoginDto = req.body;
      const { token, user } = await User.login(loginDto);
      res.status(200).json({
        message: "logged in success",
        payload: { token, user },
        status: "success",
      })
    } catch (e) {
      CatchError(e, next)
    }
  }

  async loginAsAdmin (req: Request, res: Response, next: NextFunction) {
    try {
      const loginDto: LoginDto = req.body;
      const { token, user } = await User.login(loginDto);
      res.status(200).json({
        message: "logged in success",
        payload: { token, user },
        status: "success",
      })
    } catch (e) {
      CatchError(e, next)
    }
  }
  
  async loginAsHost(req: Request, res: Response, next: NextFunction) {
    try {
      const loginDto: LoginDto = req.body;
      const { token, user } = await User.login(loginDto);
      res.status(200).json({
        message: "logged in success",
        payload: { token, user },
        status: "success",
      })
    } catch (e) {
      CatchError(e, next)
    }
  }

  async signup (req: Request, res: Response, next: NextFunction) {
    try {
      const { otp } = await OTP.saveOTP({ mobile: `${req.body.code}${req.body.mobile}` });
      res.status(200).json({ message: "success", payload: { id: otp }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async verifyOTP (req: Request, res: Response, next: NextFunction) {
    try {
      const { otp } = await OTP.verifyOTP({ mobile: req.body.mobile, otp: req.body.otp })
      if (otp) {
        res.status(200).json({ message: "code is valid", payload: { otp }, status: "success" })
      }
    } catch (err) {
      CatchError(err, next)
    }
  }

  async createGuestUser(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserDto: CreateUserDto = req.body;
      createUserDto.role = UserRole.GUEST;
      const { token, user } = await User.createUser(createUserDto);
      res.status(201).json({ message: "user created", payload: { user, token }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async createHostUser(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserDto: CreateUserDto = req.body;
      createUserDto.role = UserRole.HOST;
      const { token, user } = await User.createUser(createUserDto)
      res.status(201).json({ message: "user created", payload: { user, token }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async createHostWithoutToken(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserDto: CreateUserDto = req.body;
      createUserDto.role = UserRole.HOST;
      const { user } = await User.createUserWithoutToken(createUserDto);
      res.status(201).json({ message: "host created", payload: { user }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async createGuestWithoutToken(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserDto: CreateUserDto = req.body;
      createUserDto.role = UserRole.GUEST;
      const { user } = await User.createUserWithoutToken(createUserDto);
      res.status(201).json({ message: "guest created", payload: { user }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, user } = await User.changePassword({password: req?.body?.password, mobile: req?.body?.mobile});
      res.status(200).json({ message: "password changed", payload: { user, token }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }
  
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const updateUserDto: UpdateUserDto = req.body;
      updateUserDto.userId = req?.userId;
      const { user } = await User.updateProfile(updateUserDto)
      res.status(200).json({ message: "user updated.", payload: { user }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const updateUserDto: UpdateUserDto = req.body;
      updateUserDto.userId = req.params?.userId;
      const { user } = await User.updateUser(updateUserDto)
      res.status(200).json({ message: "user updated.", payload: { user }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async changeUserRoleToAdmin(req: Request, res: Response, next: NextFunction) {
    try {;
      const { userId } = await User.changeUserRoleToAdmin({userId: req.body?.userId})
      res.status(200).json({ message: "role changed.", payload: { userId }, status: "success" })
    } catch (err) {
      CatchError(err, next)
    }
  }

  async forgetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await OTP.forgetPassword({ mobile: req.body.mobile })
      res.status(200).json({
        message: "otp send to your mobile.",
        status: "success",
      })
    } catch (err) {
      CatchError(err, next)
    }
  }
}
