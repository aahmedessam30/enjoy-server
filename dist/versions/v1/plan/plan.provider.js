"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../../services/services");
const db_1 = require("../../../db");
const index_provider_1 = __importDefault(require("../index.provider"));
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const send_email_1 = __importDefault(require("../../../services/send-email"));
const notification_provider_1 = __importDefault(require("../notifications/notification.provider"));
const main_interface_1 = require("../../../interfaces/main.interface");
const notification_interface_1 = require("../../../interfaces/notification.interface");
class PlanProvider extends index_provider_1.default {
    constructor() {
        super("plan");
        this.email = new send_email_1.default();
        this.notify = new notification_provider_1.default();
    }
    create({ body }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.Plan.create(body);
            return { plan: result };
        });
    }
    update({ planId, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            const plan = yield db_1.Plan.findByPk(planId);
            if (!plan) {
                (0, services_1.GenerateError)({ message: this._i18n("planNotFounds"), code: 404 });
            }
            plan.nameAr = body.nameAr;
            plan.nameEn = body.nameEn;
            plan.properties = body.properties;
            plan.refresh = body.refresh;
            const result = yield plan.save();
            return { result };
        });
    }
    list({ limit, page, filters }) {
        return __awaiter(this, void 0, void 0, function* () {
            const limitMax = Number(limit) > 50 ? 50 : Number(limit);
            const offset = (Number(page) - 1) * Number(limit);
            const where = this.whereFilters(filters);
            const { count, rows } = yield db_1.Plan.findAndCountAll({
                limit: limitMax,
                offset: offset,
                where: Object.assign({}, where),
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched success",
                    payload: { plans: rows, totalItems: count, limit: limitMax, currentPage: page },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not plan yet.!",
                    payload: { plans: [], totalItems: count, limit: limitMax, currentPage: page },
                    status: "success",
                };
            }
            return { result };
        });
    }
    findOne({ planId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const plan = yield db_1.Plan.findByPk(planId, {
                include: [{ model: db_1.PlanPeriod }],
            });
            if (!plan) {
                (0, services_1.GenerateError)({ message: this._i18n("planNotFound"), code: 404 });
            }
            return { plan };
        });
    }
    deleteOrActive({ planId, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            const plan = yield db_1.Plan.findByPk(planId);
            if (!plan) {
                (0, services_1.GenerateError)({ message: this._i18n("planNotFound"), code: 404 });
            }
            plan.status = type;
            yield plan.save();
        });
    }
    listForUser({ limit, page, filters, lang }) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = lang == "ar" ? ["nameAr", "name"] : ["nameEn", "name"];
            const limitMax = Number(limit) > 50 ? 50 : Number(limit);
            const offset = (Number(page) - 1) * Number(limit);
            const where = this.whereFilters(filters);
            const { count, rows } = yield db_1.Plan.findAndCountAll({
                limit: limitMax,
                offset: offset,
                where: Object.assign(Object.assign({}, where), { status: "ACTIVE" }),
                attributes: { include: [name], exclude: ["nameEn", "nameAr", "status", "createdAt", "updatedAt"] },
                include: [
                    {
                        model: db_1.PlanPeriod,
                        where: { status: "ACTIVE" },
                        attributes: { include: [name], exclude: ["nameEn", "nameAr", "status", "createdAt", "updatedAt"] },
                    },
                ],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched success",
                    payload: { plans: rows, totalItems: count, limit: limitMax, currentPage: page },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not plans yet.!",
                    payload: { plans: [], totalItems: count, limit: limitMax, currentPage: page },
                    status: "success",
                };
            }
            return { result };
        });
    }
    findOneForUser({ planId, lang }) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = lang == "ar" ? ["nameAr", "name"] : ["nameEn", "name"];
            const plan = yield db_1.Plan.findByPk(planId, {
                attributes: { include: [name], exclude: ["nameEn", "nameAr", "createdAt", "updatedAt"] },
                include: [
                    {
                        model: db_1.PlanPeriod,
                        where: { status: "ACTIVE" },
                        attributes: { include: [name], exclude: ["nameEn", "nameAr", "createdAt", "updatedAt"] },
                    },
                ],
            });
            if (!plan) {
                (0, services_1.GenerateError)({ message: this._i18n("planNotFound"), code: 404 });
            }
            return { plan };
        });
    }
    userPlan({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPlan = yield db_1.UserPlan.findOne({
                where: { userId },
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [{ model: db_1.Plan, attributes: { exclude: ["status", "createdAt", "updatedAt"] } }],
                order: [["createdAt", "DESC"]],
            });
            return { userPlan };
        });
    }
    currentUserPlan({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPlan = yield db_1.UserPlan.findOne({
                where: { userId },
                attributes: ["id", "startAt", "endAt"],
                include: [
                    { model: db_1.Plan, attributes: { exclude: ["status", "createdAt", "updatedAt"] } },
                    { model: db_1.PlanPeriod, attributes: { exclude: ["status", "createdAt", "updatedAt"] } },
                ],
                order: [["createdAt", "DESC"]],
            });
            return { userPlan };
        });
    }
    currentUserPlanDashboard({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPlans = yield db_1.UserPlan.findAll({
                where: { userId },
                attributes: ["id", "startAt", "endAt"],
                include: [
                    { model: db_1.Plan, attributes: { exclude: ["status", "createdAt", "updatedAt"] } },
                    { model: db_1.PlanPeriod, attributes: { exclude: ["status", "createdAt", "updatedAt"] } },
                ],
                order: [["createdAt", "DESC"]],
            });
            return { userPlans };
        });
    }
    UsersPlanDashboard({ limit, page, filters }) {
        return __awaiter(this, void 0, void 0, function* () {
            const limitMax = Number(limit) > 50 ? 50 : Number(limit);
            const offset = (Number(page) - 1) * Number(limit);
            const where = this.whereFilters(filters);
            const { count, rows } = yield db_1.UserPlan.findAndCountAll({
                limit: limitMax,
                offset: offset,
                include: [
                    { model: db_1.User, where: Object.assign({}, where), attributes: ["id", "name", "email", "phone"] },
                    { model: db_1.Plan, attributes: { exclude: ["status", "createdAt", "updatedAt"] } },
                    { model: db_1.PlanPeriod, attributes: { exclude: ["status", "createdAt", "updatedAt"] } },
                ],
                order: [["createdAt", "DESC"]],
            });
            let result;
            if (count > 0) {
                result = {
                    message: "fetched success",
                    payload: { plans: rows, totalItems: count, limit: limitMax, currentPage: page },
                    status: "success",
                };
            }
            else {
                result = {
                    message: "There are not plan yet.!",
                    payload: { plans: [], totalItems: count, limit: limitMax, currentPage: page },
                    status: "success",
                };
            }
            return { result };
        });
    }
    checkUserPlan({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPlan = yield db_1.UserPlan.findOne({
                where: { userId, status: "ACTIVE" },
                attributes: ["id", "startAt", "endAt"],
                order: [["createdAt", "DESC"]],
            });
            let result;
            if (!userPlan) {
                result = { message: this._i18n("userNotHavePlan"), payload: { havePlan: false }, status: "success" };
            }
            else if ((0, moment_1.default)(userPlan.endAt).isSameOrAfter((0, moment_1.default)())) {
                result = { message: this._i18n("userHavePlan"), payload: { havePlan: true }, status: "success" };
            }
            else {
                result = { message: this._i18n("userNotHaveValidPlan"), payload: { havePlan: false }, status: "success" };
            }
            return { result };
        });
    }
    cronExpire(days) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.UserPlan.update({
                status: main_interface_1.EStatus.INACTIVE,
            }, {
                where: {
                    endAt: {
                        [sequelize_1.Op.lte]: (0, moment_1.default)().endOf("day").subtract({ days: 1 }),
                    },
                },
            });
            const usersplan = yield db_1.UserPlan.findAll({
                attributes: ["id"],
                include: [
                    { model: db_1.User, attributes: ["id", "email"] },
                    { model: db_1.PlanPeriod, attributes: ["id", "nameAr"] },
                ],
                where: {
                    status: main_interface_1.EStatus.ACTIVE,
                    endAt: {
                        [sequelize_1.Op.between]: [(0, moment_1.default)().startOf("day").add({ days }), (0, moment_1.default)().endOf("day").add({ days })],
                    },
                },
            });
            usersplan.forEach((plan) => {
                const msg = days == 0
                    ? `سينتهي اشتراك في ${plan.plan_period.nameAr} اليوم يمكنك تجديد الاشتراك مره اخرى`
                    : `سينتهي اشتراك في  ${plan.plan_period.nameAr}  بعد ${days} ايام يمكنك تجديد الاشتراك مره اخرى`;
                this.notify.sendNotifyToUsers([plan.user.id], msg, notification_interface_1.NotificationType.SUBSCRIPTION, "darkkom://", "", "اشتراكك 🗓️");
                this.email.send([plan.user.email], "اشتراك على وشك الانتهاء 🗓️", "ar", "plan-expire", { msg });
            });
        });
    }
}
exports.default = PlanProvider;
//# sourceMappingURL=plan.provider.js.map