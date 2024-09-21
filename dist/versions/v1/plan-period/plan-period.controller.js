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
const plan_period_provider_1 = __importDefault(require("./plan-period.provider"));
const PlanPreiod = new plan_period_provider_1.default();
class PlanPreiodController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { planPeriod } = yield PlanPreiod.create({
                    body: req.body,
                });
                res.status(201).json({ message: "created", payload: { planPeriod }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield PlanPreiod.update({
                    periodId: req.params.id,
                    body: req.body,
                });
                res.status(200).json({ message: "updated", payload: { result }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { result } = yield PlanPreiod.list({ limit: req.query.limit, page: req.query.page, filters: req.query.filters });
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
                const { period } = yield PlanPreiod.findOne({
                    periodId: req.params.id,
                });
                res.status(200).json({ message: "found", payload: { period }, status: "success" });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    deleteOrActive(req, res, next) {
        const periodId = req.params.id;
        const type = req.params.type == "delete" ? "DELETED" : "ACTIVE";
        PlanPreiod.deleteOrActive({ periodId, type })
            .then(() => res.status(200).json({ message: `period ${type}`, status: "success" }))
            .catch((err) => (0, services_1.CatchError)(err, next));
    }
}
exports.default = PlanPreiodController;
//# sourceMappingURL=plan-period.controller.js.map