import { Router } from "express"
import { body, param, query } from "express-validator"
import UserController from "./user.controller"
import { User } from "../../../db"
import { isAdmin, isAuth, isHostAuth } from "../../../middlewares/auth.old"
import validateFields from "../../../middlewares/validate-fields"
import { UserRole } from "../../../interfaces/user.interface"

export default class UserRouter {
	router: Router
	private userController = new UserController()

	constructor() {
		this.router = Router();
		this.routes();
	}

  	private routes() {
		this.router.post("/guest/login", this.validator("guestUserLogin"), validateFields, this.userController.loginAsGuest)

		this.router.post("/admin/login", this.validator("adminLogin"), validateFields, this.userController.loginAsAdmin)

		this.router.post("/host/login", this.validator("hostUserLogin"), validateFields, this.userController.loginAsHost)

		this.router.post("/signup", this.validator("signup"), validateFields, this.userController.signup)

		this.router.post("/otp", this.validator("otp"), validateFields, this.userController.verifyOTP)

		this.router.get("/users", isAuth, this.userController.getUser)

		this.router.get("/admin/me", isAdmin, this.userController.getUser)

		this.router.get("/host/me", isHostAuth, this.userController.getUser)

		this.router.post("/guest/register", this.validator("createUser"), validateFields, this.userController.createGuestUser)

		this.router.post("/host/register", this.validator("createUser"), validateFields, this.userController.createHostUser)

		this.router.patch("/users", isAuth, this.validator("updateUser"), this.userController.updateProfile)

		this.router.post("/forget-password", this.validator("forgetPassword"), validateFields, this.userController.forgetPassword)

		this.router.post("/verify", this.validator("otp"), validateFields, this.userController.verifyOTP)

		this.router.post("/admin/change-role", isAuth, this.validator("changeRole"), validateFields, this.userController.changeUserRoleToAdmin)

		this.router.get("/admin/users/:userId", isAdmin, this.validator("getOne"), validateFields, this.userController.getUserForAdmin)

		this.router.get("/admin/users", isAdmin, this.validator("list"), validateFields, this.userController.getUsers)

		this.router.post("/admin/host/users", isAdmin, this.validator("createUser"), validateFields, this.userController.createHostWithoutToken)

		this.router.post("/admin/guest/users", isAdmin, this.validator("createUser"), validateFields, this.userController.createGuestWithoutToken)

		this.router.patch("/admin/users/:userId", isAdmin, this.validator("updateUser"), this.userController.updateUser)

		this.router.patch("/change-password", this.validator("changePassword"), validateFields, this.userController.changePassword)
  	}

	private validator(route: string) {
		if (route == "guestUserLogin") {
			return [
				body("mobile")
				.trim()
				.isMobilePhone('any')
				.notEmpty()
				.custom(async (value) => {
					const userDoc = await User.findOne({
						where: { mobile: value, status: "ACTIVE", role: UserRole.GUEST},
					})
					if (!userDoc) {
						return Promise.reject("الحساب غير موجود")
					}
				}),
				body("password").trim().notEmpty().isLength({ min: 5, max: 30 }),
			]
		} else if (route == "hostUserLogin") {
			return [
				body("mobile")
				.trim()
				.isMobilePhone('any')
				.notEmpty()
				.custom(async (value) => {
					const userDoc = await User.findOne({
						where: { mobile: value, status: "ACTIVE", role: UserRole.HOST },
					})
					if (!userDoc) {
						return Promise.reject("You are not authrized for this service")
					}
				}),
				body("password").trim().notEmpty().isString().isLength({ min: 5, max: 30 }),
			]
		} else if (route == "adminLogin") {
			return [
				body("mobile")
				.trim()
				.isMobilePhone('any')
				.notEmpty()
				.custom(async (value) => {
					const userDoc = await User.findOne({
						where: { mobile: value, status: "ACTIVE", role: UserRole.ADMIN },
					})
					if (!userDoc) {
						return Promise.reject("You are not authrized for this service")
					}
				}),
				body("password").trim().notEmpty().isString().isLength({ min: 5, max: 30 }),
			]
		} else if (route == "signup") {
			return [
				body("mobile")
				.notEmpty()
				.trim()
				.isMobilePhone('any')
				.custom(async (value) => {
				const userDoc = await User.findOne({ where: { mobile: value }})
					if (userDoc) {
						return Promise.reject('رقم الهاتف موجود سابقا')
					}
				}),
			]
		} else if (route == "otp") {
			return [body("mobile").trim().notEmpty().isMobilePhone('any'), body("otp").trim().notEmpty().isLength({ min: 4, max: 4 })]
		} else if (route == "changePassword") {
			return [
				body("mobile").trim().notEmpty().isMobilePhone('any').isLength({min: 9, max: 9}), 
				body("password").trim().notEmpty().isString().isLength({ min: 5, max: 30 }),
			]
		} else if (route == "list") {
			return [
				query("type").trim().notEmpty().isIn(Object.values(UserRole)), 
			]
		} else if (route == "changeRole") {
			return [
				body("userId").trim().notEmpty().isUUID(), 
			]
		} else if (route == "getOne") {
			return [
				param("userId").trim().notEmpty().isUUID(), 
			]
		} else if (route == "createUser") {
			return [
				body("name").trim().notEmpty().isLength({ min: 2, max: 80 }),
				body("password").trim().notEmpty().isLength({ min: 5, max: 30 }),
				body("mobile")
				.trim()
				.notEmpty()
				.isMobilePhone('any')
				.custom(async (value) => {
					const userDoc = await User.findOne({ where: { mobile: value } })
					if (userDoc) {
						return Promise.reject('رقم الجوال موجود')
					}
				}),
			]
		} else if (route == "updateUser") {
			return [
				body("name").trim().notEmpty().isLength({ min: 5 }),
				body("mobile")
				.trim()
				.isMobilePhone('any')
				.notEmpty()
				.custom(async (value) => {
					const userDoc = await User.findOne({ where: { mobile: value } })
					if (!userDoc) {
						return Promise.reject("رقم الجوال غير موجود")
					}
				}),
				param("userId").trim().notEmpty().isUUID(), 
			]
		} else if (route == "forgetPassword") {
			return [
				body("mobile")
				.trim()
				.isMobilePhone('any')
				.notEmpty()
				.custom(async (value) => {
					const userDoc = await User.findOne({ where: { mobile: value } })
					if (!userDoc) {
						return Promise.reject("رقم الجوال غير موجود")
					}
				}),
			]
		}
	}
}
