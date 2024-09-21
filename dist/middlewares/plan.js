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
const plan_provider_1 = __importDefault(require("../versions/v1/plan/plan.provider"));
const moment_1 = __importDefault(require("moment"));
const checkPlan = (action) => {
    try {
        return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            const userId = req.userId;
            if (!userId) {
                res.status(404).json({ message: "User is missing" });
            }
            const { userPlan } = yield new plan_provider_1.default().userPlan({ userId });
            if (!userPlan || userPlan.status != "ACTIVE" || (0, moment_1.default)().isAfter(userPlan.endAt)) {
                res.status(404).json({ message: "يجب الاشتراك في احد الباقات المتاحة" });
            }
            else if (!userPlan.plan[action]) {
                res.status(404).json({ message: "هذه الميزه لا توجد في باقتك" });
            }
            else {
                next();
            }
        });
    }
    catch (e) {
        console.log(e);
    }
};
exports.default = checkPlan;
//# sourceMappingURL=plan.js.map