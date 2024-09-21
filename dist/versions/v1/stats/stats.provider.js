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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../db");
class StatsProvider {
    getUsersStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalUsers = yield db_1.User.count();
            let stats = {};
            if (totalUsers) {
                stats = Object.assign(stats, {
                    totalUsers,
                });
            }
            const result = { message: "Fetched successfully", payload: { stats }, status: "success" };
            return { result };
        });
    }
}
exports.default = StatsProvider;
//# sourceMappingURL=stats.provider.js.map