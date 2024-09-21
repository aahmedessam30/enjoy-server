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
const plan_transaction_provider_1 = __importDefault(require("./plan-transaction.provider"));
const twilio_sms_1 = __importDefault(require("../../../services/twilio-sms"));
const yamamah_sms_1 = __importDefault(require("../../../services/yamamah-sms"));
const PlanTransaction = new plan_transaction_provider_1.default();
const Twilio = new twilio_sms_1.default();
const Yamamah = new yamamah_sms_1.default();
class PlanTransactionController {
    createPlanTransaction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { transaction } = yield PlanTransaction.createPlanTransaction({
                    userId: req.userId,
                    createTransactionDto: req.body,
                });
                res.status(201).json({
                    message: "Plan transaction created.",
                    payload: { transaction },
                    status: "success",
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
    createPlanInvoice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { invoice, transaction } = yield PlanTransaction.createPlanInvoice({
                    userId: req.userId,
                    createInvoiceDto: req.body,
                });
                res.status(201).json({
                    message: "Plan invoice created.",
                    payload: { invoice },
                    status: "success",
                });
            }
            catch (err) {
                (0, services_1.CatchError)(err, next);
            }
        });
    }
}
exports.default = PlanTransactionController;
//# sourceMappingURL=plan-transaction.controller.js.map