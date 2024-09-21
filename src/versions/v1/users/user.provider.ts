//Business logic for all user routes
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { GenerateError } from "../../../services/services"
import { User } from "../../../db"
import {  Op } from "sequelize"
import Email from "../../../services/send-email"
import MainProvider from "../index.provider"
import NotificationProvider from "../notifications/notification.provider"
import { IUser, UserRole, UserStatus } from "../../../interfaces/user.interface"
import OTPProvider from "./otps/otp.provider"
import { jwtConfig } from "../../../config"
import { LoginDto } from "./dtos/login.dto"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UpdateUserDto } from "./dtos/update-user.dto"

export default class UserProvider extends MainProvider {
	notify: NotificationProvider
	sendEmail: Email
	OTP: OTPProvider
	constructor() {
		super("user")
		this.sendEmail = new Email()
		this.notify = new NotificationProvider()
		this.OTP = new OTPProvider()
	}

	async getUser({ userId }) {
		const user = await User.findOne({
			where: { id: userId, status: "ACTIVE" },
			attributes: { exclude: ["password"] },
		})
		if (!user) {
			GenerateError({ message: this._i18n("accountNotfound"), code: 404 });
		}

		return { user }
	}

	async login(loginDto: LoginDto) {
		const user = await User.findOne({ where: { mobile: loginDto.mobile } })
		if (!user) {
			GenerateError({ message: this._i18n("userNotFound"), code: 404 })
		}
		const isEqual = await bcrypt.compare(loginDto.password, user.password)
		if (!isEqual) {
			GenerateError({ message: this._i18n("wrongPassword"), code: 404 })
		}
		const token = jwt.sign({ role: user.role, mobile: user.mobile, userId: user.id }, jwtConfig.SECRETKEY, {
			expiresIn: "365d",
		})

		return {
			token,
			user: {
				id: user.id,
				name: user.name,
				mobile: user.mobile,
				code: user.code,
				role: user.role,
				email: user.email,
				createdAt: user.createdAt,
				authorize: user.authorize,
			},
		}
	}

	async getUsers ({type, currentPage, perPage, filter }) {
		let filters = {}
		if (typeof filter === "string" && filter !== null && filter !== "") {
		filters = Object.assign(filters, {
			[Op.or]: {
				email: {
					[Op.like]: `%${filter}%`,
				},
				name: {
					[Op.like]: `%${filter}%`,
				},
				id: {
					[Op.eq]: filter,
				},
			},
		})
		}
		const { count, rows } = await User.findAndCountAll({
			distinct: true,
			attributes: { exclude: ["password"] },
			where: {role: type, ...filters},
			order: [["createdAt", "DESC"]],
			limit: perPage,
			offset: currentPage * perPage,
		})
		let result: { message: string; payload: object; status: string }
		if (count > 0) {
			result = {
				message: this._i18n("fetchedSuccess"),
				payload: { users: rows, totalItems: count, }, 
				status: "success",
			}
		} else {
			result = {
				message: this._i18n("notFoundUsers"),
				payload: { users: [], totalItems: count },
				status: "success",
			}
		}
		return { result }
	}

	async createUser(createUserDto: CreateUserDto): Promise<{token: string; user: IUser}> {
		const hashedPw = await bcrypt.hash(createUserDto?.password, 12);
		const userCreated = await User.create({
			code: createUserDto.code,
			name: createUserDto.name,
			mobile: createUserDto.mobile,
			role: createUserDto.role,
			password: hashedPw,
		})

		const token = jwt.sign({ mobile: userCreated.mobile, userId: userCreated.id }, jwtConfig.SECRETKEY, {
			expiresIn: "5000d",
		})
		
		return {
			token,
			user: {
				id: userCreated.id,
				name: userCreated.name,
				mobile: userCreated.mobile,
				code: userCreated.code,
				role: userCreated.role,
				email: userCreated.email,
				status: userCreated.status, 
				reference: userCreated.reference,
				createdAt: userCreated.createdAt,
				authorize: userCreated.authorize,
			},
		}
	}

	async createUserWithoutToken(createUserDto: CreateUserDto): Promise<{user: IUser}> {
		const hashedPw = await bcrypt.hash(createUserDto?.password, 12);
		const userCreated = await User.create({
			code: createUserDto.code,
			name: createUserDto.name,
			mobile: createUserDto.mobile,
			role: createUserDto.role,
			password: hashedPw,
		})
		
		return {
			user: {
				id: userCreated.id,
				name: userCreated.name,
				mobile: userCreated.mobile,
				code: userCreated.code,
				role: userCreated.role,
				email: userCreated.email,
				status: userCreated.status, 
				reference: userCreated.reference,
				createdAt: userCreated.createdAt,
				authorize: userCreated.authorize,
			},
		}
	}

	async changePassword({password, mobile}: {password: string, mobile: string}): Promise<{token: string; user: IUser}> {
		const user = await User.findOne({where: {mobile: mobile, status: UserStatus.ACTIVE}});
		
		if (!user) {
			GenerateError({ message: this._i18n("userNotFound"), code: 404 })
		}

		const hashedPw = await bcrypt.hash(password, 12);
		
		user.password = hashedPw;

		const result = await user?.save();

		const token = jwt.sign({ mobile: result?.mobile, userId: result?.id }, jwtConfig.SECRETKEY, {
			expiresIn: "5000d",
		})
		
		return {
			token,
			user: {
				id: result?.id,
				name: result?.name,
				mobile: result.mobile,
				code: result.code,
				role: result.role,
				email: result.email,
				status: result.status, 
				reference: result.reference,
				createdAt: result.createdAt,
				authorize: result.authorize,
			},
		}
	}

	async updateProfile(updateUserDto: UpdateUserDto): Promise<{user: IUser}> {
		const user = await User.findByPk(updateUserDto?.userId)
		if (!user) {
			GenerateError({ message: this._i18n("userNotFound"), code: 404 })
		}
		user.name = updateUserDto?.name
		user.email = updateUserDto?.email;
	
		const result = await user.save();
	
		return {
			user: {
				id: result.id,
				name: result.name,
				mobile: result.mobile,
				code: result.code,
				role: result.role,
				status: result.status, 
				reference: result.reference,
				email: result.email,
				createdAt: result.createdAt,
				authorize: result.authorize
			},
		}
	}

	async updateUser (updateUserDto: UpdateUserDto): Promise<{user: IUser}> {
		const user = await User.findByPk(updateUserDto?.userId)
		if (!user) {
			GenerateError({ message: this._i18n("userNotFound"), code: 404 })
		}
		user.name = updateUserDto?.name;
		user.email = updateUserDto?.email;
		user.mobile = updateUserDto?.mobile;
		user.authorize = updateUserDto?.authorize;
		user.status = updateUserDto?.status ? UserStatus.ACTIVE : UserStatus.INACTIVE;
	
		const result = await user.save();
	
		return {
			user: {
				id: result.id,
				name: result.name,
				mobile: result.mobile,
				code: result.code,
				role: result.role,
				status: result.status,
				reference: result.reference,
				email: result.email,
				createdAt: result.createdAt,
				authorize: result.authorize
			},
		}
	}

	async authorizeUser ({ userId }) {
		const user = await User.findByPk(userId)
		if (!user) {
			GenerateError({ message: this._i18n("userNotFound"), code: 404 })
		}
		user.authorize = true
		const result = await user.save()

		return { userId: result.id, }
	}

	async changeUserRoleToAdmin ({ userId }) {
		const user = await User.findByPk(userId)
		if (!user) {
			GenerateError({ message: this._i18n("userNotFound"), code: 404 })
		}
		if(user?.role !== UserRole.ADMIN) {
			user.role = UserRole.ADMIN;
		}
		const result = await user.save()

		return { userId: result?.id }
	}
}
