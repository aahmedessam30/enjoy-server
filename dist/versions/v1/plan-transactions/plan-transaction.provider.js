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
const db_1 = require("../../../db");
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("../../../models"));
const moment_1 = __importDefault(require("moment"));
const transaction_interface_1 = require("../../../interfaces/transaction.interface");
const main_interface_1 = require("../../../interfaces/main.interface");
class PlanTransactionProvider {
    createPlanTransaction({ userId, createTransactionDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.default.transaction({ isolationLevel: sequelize_1.Transaction.ISOLATION_LEVELS.SERIALIZABLE }, (t) => __awaiter(this, void 0, void 0, function* () {
                    const transaction = yield db_1.Transaction.create({
                        amount: createTransactionDto.amount,
                        amountAfterDiscount: createTransactionDto.amountAfterDiscount,
                        promoCodeId: createTransactionDto.promoId,
                        userId: userId,
                    }, { transaction: t });
                    const planPeriod = yield db_1.PlanPeriod.findOne({
                        where: { id: createTransactionDto.planPeriodId },
                        transaction: t,
                    });
                    let planTransaction;
                    if (transaction && planPeriod) {
                        planTransaction = yield db_1.PlanTransaction.create({
                            transactionId: transaction.id,
                            planId: planPeriod.planId,
                            planPeriodId: planPeriod.id,
                        }, { transaction: t });
                    }
                    return { transaction: { planTransaction, transaction } };
                }));
                return result;
            }
            catch (e) {
                throw e;
            }
        });
    }
    createPlanInvoice({ userId, createInvoiceDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models_1.default.transaction({ isolationLevel: sequelize_1.Transaction.ISOLATION_LEVELS.SERIALIZABLE }, (t) => __awaiter(this, void 0, void 0, function* () {
                    const transaction = yield db_1.Transaction.findOne({
                        where: { id: createInvoiceDto.transactionId },
                        include: [
                            {
                                model: db_1.User,
                                attributes: ["id", "phone", "code"],
                            },
                        ],
                        transaction: t,
                    });
                    let invoice;
                    if (transaction) {
                        transaction.status = transaction_interface_1.TransactionStatus.SUCCESS;
                        const result = yield transaction.save({ transaction: t });
                        if (result) {
                            invoice = yield db_1.Invoice.create({
                                total: result.amountAfterDiscount,
                                transactionId: result.id,
                                userId: userId,
                            }, { transaction: t });
                            const promo = yield db_1.PromoCode.findOne({
                                where: { id: result.promoCodeId },
                                transaction: t,
                            });
                            if (promo && promo.count > 0) {
                                promo.count = promo.count - 1;
                                yield promo.save({ transaction: t });
                            }
                        }
                        const planTransaction = yield db_1.PlanTransaction.findOne({
                            where: { transactionId: createInvoiceDto.transactionId },
                            include: { model: db_1.PlanPeriod, attributes: ["periodByMonth"] },
                            transaction: t,
                        });
                        if (planTransaction) {
                            yield this.createUserPlan({
                                createUserPlanDto: {
                                    userId: transaction.userId,
                                    planId: planTransaction.planId,
                                    planPeriodId: planTransaction.planPeriodId,
                                    planTransactionId: planTransaction.id,
                                    endAt: planTransaction.plan_period.periodByMonth,
                                },
                            });
                        }
                    }
                    return { invoice, transaction };
                }));
                return result;
            }
            catch (e) {
                throw e;
            }
        });
    }
    createUserPlan({ createUserPlanDto }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.UserPlan.update({
                status: main_interface_1.EStatus.INACTIVE,
            }, {
                where: {
                    userId: createUserPlanDto.userId,
                    status: main_interface_1.EStatus.ACTIVE,
                },
            });
            yield db_1.UserPlan.create({
                userId: createUserPlanDto.userId,
                planId: createUserPlanDto.planId,
                planPeriodId: createUserPlanDto.planPeriodId,
                planTransactionId: createUserPlanDto.planTransactionId,
                endAt: (0, moment_1.default)()
                    .add(createUserPlanDto.endAt * 30, "d")
                    .format("YYYY-MM-DD HH:mm"),
            });
        });
    }
    addDefultPlan({ userId, planPeriodId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const planPeriod = yield db_1.PlanPeriod.findByPk(planPeriodId);
            if (planPeriod) {
                const createUserPlanDto = { userId, planId: planPeriod.planId, planPeriodId, endAt: planPeriod.periodByMonth };
                yield this.createUserPlan({ createUserPlanDto });
            }
        });
    }
}
exports.default = PlanTransactionProvider;
//# sourceMappingURL=plan-transaction.provider.js.map