"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const city_router_1 = __importDefault(require("./cities/city.router"));
const country_router_1 = __importDefault(require("./countries/country.router"));
const district_router_1 = __importDefault(require("./districts/district.router"));
const category_router_1 = __importDefault(require("./categories/category.router"));
const device_router_1 = __importDefault(require("./devices/device.router"));
const charge_router_1 = __importDefault(require("./charges/charge.router"));
const feature_router_1 = __importDefault(require("./features/feature.router"));
const unit_router_1 = __importDefault(require("./unit/unit.router"));
const user_router_1 = __importDefault(require("./users/user.router"));
const info_router_1 = __importDefault(require("./infos/info.router"));
const notification_router_1 = __importDefault(require("./notifications/notification.router"));
const media_router_1 = __importDefault(require("./media/media.router"));
const stats_router_1 = __importDefault(require("./stats/stats.router"));
const unit_location_router_1 = __importDefault(require("./unit-location/unit-location.router"));
const charge_router_2 = __importDefault(require("./charges/charge.router"));
const reservation_router_1 = __importDefault(require("./reservations/reservation.router"));
const promo_code_router_1 = __importDefault(require("./promo-codes/promo-code.router"));
const image_router_1 = __importDefault(require("./image/image.router"));
const bookmark_router_1 = __importDefault(require("./bookmark/bookmark.router"));
const notify_router_1 = __importDefault(require("./notify/notify.router"));
const unit_features_router_1 = __importDefault(require("./unit-features/unit-features.router"));
const unit_kithchen_features_router_1 = __importDefault(require("./unit-kitchen-features/unit-kithchen-features.router"));
const unit_bathroom_features_router_1 = __importDefault(require("./unit-bathroom-features/unit-bathroom-features.router"));
const pool_router_1 = __importDefault(require("./pools/pool.router"));
const unit_pool_router_1 = __importDefault(require("./unit-pools/unit-pool.router"));
const unit_bedroom_router_1 = __importDefault(require("./unit-bedrooms/unit-bedroom.router"));
const unit_board_router_1 = __importDefault(require("./unit-boards/unit-board.router"));
const unit_term_router_1 = __importDefault(require("./unit-terms/unit-term.router"));
const bookmark_router_2 = __importDefault(require("./bookmark/bookmark.router"));
const rated_city_router_1 = __importDefault(require("./rated-cities/rated-city.router"));
const cover_router_1 = __importDefault(require("./covers/cover.router"));
const checkout_router_1 = __importDefault(require("./checkout/checkout.router"));
const contact_router_1 = __importDefault(require("./contacts/contact.router"));
exports.default = {
    cityrouter: city_router_1.default,
    districtrouter: district_router_1.default,
    countryrouter: country_router_1.default,
    categoryrouter: category_router_1.default,
    devicerouter: device_router_1.default,
    transactionrouter: charge_router_1.default,
    featurerouter: feature_router_1.default,
    UnitRouter: unit_router_1.default,
    userrouter: user_router_1.default,
    inforouter: info_router_1.default,
    notificationRouter: notification_router_1.default,
    MediaRouter: media_router_1.default,
    statsRouter: stats_router_1.default,
    UnitLocationRouter: unit_location_router_1.default,
    ChargeRouter: charge_router_2.default,
    ReservationRouter: reservation_router_1.default,
    PromoCodeRouter: promo_code_router_1.default,
    ImageRouter: image_router_1.default,
    bookmarkRouter: bookmark_router_1.default,
    NotifyRouter: notify_router_1.default,
    UnitFeatureRouter: unit_features_router_1.default,
    UnitBathroomRouter: unit_bathroom_features_router_1.default,
    UnitKitchenRouter: unit_kithchen_features_router_1.default,
    PoolRouter: pool_router_1.default,
    UnitPoolRouter: unit_pool_router_1.default,
    UnitBedroomRouter: unit_bedroom_router_1.default,
    UnitBoardRouter: unit_board_router_1.default,
    UnitTermRouter: unit_term_router_1.default,
    BookmarkRouter: bookmark_router_2.default,
    RatedCityRouter: rated_city_router_1.default,
    CoverRouter: cover_router_1.default,
    CheckoutRouter: checkout_router_1.default,
    ContactRouter: contact_router_1.default,
};
//# sourceMappingURL=routes.js.map