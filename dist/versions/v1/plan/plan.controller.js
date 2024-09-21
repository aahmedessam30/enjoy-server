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
const plan_provider_1 = __importDefault(require("./plan.provider"));
const Plan = new plan_provider_1.default();
class PlanController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { plan } = yield Plan.create({
                    body: req.body,
                });
                res.status(201).json({ message: "Plan created.", payload: { plan }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Plan.update({
                    planId: req.params.id,
                    body: req.body,
                });
                res.status(200).json({ message: "Plan updated.", payload: { result }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Plan.list({ limit: req.query.limit, page: req.query.page, filters: req.query.filters });
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    findOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { plan } = yield Plan.findOne({
                    planId: req.params.id,
                });
                res.status(200).json({ message: "Plan found", payload: { plan }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    deleteOrActive(req, res, next) {
        const planId = req.params.id;
        const type = req.params.type == "delete" ? "DELETED" : req.params.type == "inactive" ? "INACTIVE" : "ACTIVE";
        Plan.deleteOrActive({ planId, type })
            .then(() => res.status(200).json({ message: `plan ${type}`, status: "success" }))
            .catch((err) => (0, services_1.CatchError)(err, next));
    }
    listForUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = { limit: req.query.limit, page: req.query.page, filters: req.query.filters, lang: req.lang };
                const { result } = yield Plan.listForUser(params);
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    findOneForUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { plan } = yield Plan.findOneForUser({
                    planId: req.params.id,
                    lang: req.lang,
                });
                res.status(200).json({ message: "Plan found", payload: { plan }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    currentUserPlan(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userPlan } = yield Plan.currentUserPlan({ userId: req.userId });
                res.status(200).json({ message: "user plan", payload: { userPlan }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    currentUserPlanDashboard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userPlans } = yield Plan.currentUserPlanDashboard({ userId: req.params.userId });
                res.status(200).json({ message: "user plan", payload: { userPlans }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    UsersPlanDashboard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, page, filters } = req.query;
                const { result } = yield Plan.UsersPlanDashboard({ limit, page, filters });
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    checkUserPlan(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield Plan.checkUserPlan({ userId: req.userId });
                res.status(200).json(result);
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = PlanController;
//# sourceMappingURL=plan.controller.js.map