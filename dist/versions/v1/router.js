"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const routes_1 = __importDefault(require("./routes"));
const express_1 = require("express");
class MainRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.use(new routes_1.default.cityrouter().router);
        this.router.use(new routes_1.default.RatedCityRouter().router);
        this.router.use("/countries", new routes_1.default.countryrouter().router);
        this.router.use(new routes_1.default.districtrouter().router);
        this.router.use(new routes_1.default.categoryrouter().router);
        this.router.use(new routes_1.default.devicerouter().router);
        this.router.use(new routes_1.default.transactionrouter().router);
        this.router.use(new routes_1.default.featurerouter().router);
        this.router.use(new routes_1.default.UnitRouter().router);
        this.router.use(new routes_1.default.UnitFeatureRouter().router);
        this.router.use(new routes_1.default.UnitBathroomRouter().router);
        this.router.use(new routes_1.default.UnitKitchenRouter().router);
        this.router.use(new routes_1.default.PoolRouter().router);
        this.router.use(new routes_1.default.UnitPoolRouter().router);
        this.router.use(new routes_1.default.UnitBedroomRouter().router);
        this.router.use(new routes_1.default.UnitBoardRouter().router);
        this.router.use(new routes_1.default.UnitTermRouter().router);
        this.router.use(new routes_1.default.CheckoutRouter().router);
        this.router.use(new routes_1.default.userrouter().router);
        this.router.use("/info", new routes_1.default.inforouter().router);
        this.router.use("/notifications", new routes_1.default.notificationRouter().router);
        this.router.use("/contacts", new routes_1.default.ContactRouter().router);
        this.router.use(new routes_1.default.MediaRouter().router);
        this.router.use(new routes_1.default.statsRouter().router);
        this.router.use(new routes_1.default.UnitLocationRouter().router);
        this.router.use(new routes_1.default.ChargeRouter().router);
        this.router.use(new routes_1.default.ReservationRouter().router);
        this.router.use(new routes_1.default.PromoCodeRouter().router);
        this.router.use(new routes_1.default.ImageRouter().router);
        this.router.use(new routes_1.default.bookmarkRouter().router);
        this.router.use("/notify", new routes_1.default.NotifyRouter().router);
        this.router.use(new routes_1.default.CoverRouter().router);
    }
}
exports.MainRouter = MainRouter;
//# sourceMappingURL=router.js.map