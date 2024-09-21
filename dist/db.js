"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = exports.Cover = exports.RatedCity = exports.UnitTerm = exports.UnitPool = exports.Pool = exports.UnitBedroom = exports.UnitBoard = exports.UnitKitchenFeature = exports.UnitBathroomFeature = exports.SendEmail = exports.Bookmark = exports.Image = exports.Facility = exports.PromoCode = exports.Info = exports.OTP = exports.Feature = exports.Unit = exports.UnitLocation = exports.Reservation = exports.Notification = exports.Charge = exports.Device = exports.Category = exports.Country = exports.District = exports.City = exports.User = void 0;
const user_model_1 = __importDefault(require("./models/user.model"));
exports.User = user_model_1.default;
const city_model_1 = __importDefault(require("./models/city.model"));
exports.City = city_model_1.default;
const district_model_1 = __importDefault(require("./models/district.model"));
exports.District = district_model_1.default;
const country_model_1 = __importDefault(require("./models/country.model"));
exports.Country = country_model_1.default;
const category_model_1 = __importDefault(require("./models/category.model"));
exports.Category = category_model_1.default;
const device_model_1 = __importDefault(require("./models/device.model"));
exports.Device = device_model_1.default;
const charge_model_1 = __importDefault(require("./models/charge.model"));
exports.Charge = charge_model_1.default;
const notification_model_1 = __importDefault(require("./models/notification.model"));
exports.Notification = notification_model_1.default;
const reservation_model_1 = __importDefault(require("./models/reservation.model"));
exports.Reservation = reservation_model_1.default;
const unit_location_model_1 = __importDefault(require("./models/unit-location.model"));
exports.UnitLocation = unit_location_model_1.default;
const unit_model_1 = __importDefault(require("./models/unit.model"));
exports.Unit = unit_model_1.default;
const feature_model_1 = __importDefault(require("./models/feature.model"));
exports.Feature = feature_model_1.default;
const otp_model_1 = __importDefault(require("./models/otp.model"));
exports.OTP = otp_model_1.default;
const info_model_1 = __importDefault(require("./models/info.model"));
exports.Info = info_model_1.default;
const promo_code_model_1 = __importDefault(require("./models/promo-code.model"));
exports.PromoCode = promo_code_model_1.default;
const facility_model_1 = __importDefault(require("./models/facility.model"));
exports.Facility = facility_model_1.default;
const image_model_1 = __importDefault(require("./models/image.model"));
exports.Image = image_model_1.default;
const bookmark_model_1 = __importDefault(require("./models/bookmark.model"));
exports.Bookmark = bookmark_model_1.default;
const send_email_model_1 = __importDefault(require("./models/send-email.model"));
exports.SendEmail = send_email_model_1.default;
const unit_bathroom_feature_model_1 = __importDefault(require("./models/unit-bathroom-feature.model"));
exports.UnitBathroomFeature = unit_bathroom_feature_model_1.default;
const unit_kitchen_feature_model_1 = __importDefault(require("./models/unit-kitchen-feature.model"));
exports.UnitKitchenFeature = unit_kitchen_feature_model_1.default;
const unit_board_model_1 = __importDefault(require("./models/unit-board.model"));
exports.UnitBoard = unit_board_model_1.default;
const unit_bedroom_model_1 = __importDefault(require("./models/unit-bedroom.model"));
exports.UnitBedroom = unit_bedroom_model_1.default;
const pool_model_1 = __importDefault(require("./models/pool.model"));
exports.Pool = pool_model_1.default;
const unit_pool_model_1 = __importDefault(require("./models/unit-pool.model"));
exports.UnitPool = unit_pool_model_1.default;
const unit_term_model_1 = __importDefault(require("./models/unit-term.model"));
exports.UnitTerm = unit_term_model_1.default;
const rated_city_model_1 = __importDefault(require("./models/rated-city.model"));
exports.RatedCity = rated_city_model_1.default;
const cover_model_1 = __importDefault(require("./models/cover.model"));
exports.Cover = cover_model_1.default;
const contact_model_1 = __importDefault(require("./models/contact.model"));
exports.Contact = contact_model_1.default;
country_model_1.default.hasMany(city_model_1.default);
city_model_1.default.belongsTo(country_model_1.default);
city_model_1.default.hasMany(district_model_1.default);
district_model_1.default.belongsTo(city_model_1.default);
country_model_1.default.hasMany(category_model_1.default);
category_model_1.default.belongsTo(country_model_1.default);
user_model_1.default.hasMany(device_model_1.default);
device_model_1.default.belongsTo(user_model_1.default);
user_model_1.default.belongsToMany(notification_model_1.default, {
    through: "user_notifications",
    timestamps: false,
});
notification_model_1.default.belongsToMany(user_model_1.default, {
    through: "user_notifications",
    timestamps: false,
});
country_model_1.default.hasMany(unit_location_model_1.default);
unit_location_model_1.default.belongsTo(country_model_1.default);
city_model_1.default.hasMany(unit_location_model_1.default);
unit_location_model_1.default.belongsTo(city_model_1.default);
district_model_1.default.hasMany(unit_location_model_1.default);
unit_location_model_1.default.belongsTo(district_model_1.default);
unit_model_1.default.hasOne(unit_location_model_1.default);
unit_location_model_1.default.belongsTo(unit_model_1.default);
unit_model_1.default.belongsToMany(feature_model_1.default, {
    through: "unit_features",
    timestamps: false,
});
feature_model_1.default.belongsToMany(unit_model_1.default, {
    through: "unit_features",
    timestamps: false,
});
unit_model_1.default.hasMany(unit_kitchen_feature_model_1.default);
unit_kitchen_feature_model_1.default.belongsTo(unit_model_1.default);
feature_model_1.default.hasMany(unit_kitchen_feature_model_1.default);
unit_kitchen_feature_model_1.default.belongsTo(feature_model_1.default);
unit_model_1.default.hasMany(unit_bathroom_feature_model_1.default);
unit_bathroom_feature_model_1.default.belongsTo(unit_model_1.default);
feature_model_1.default.hasMany(unit_bathroom_feature_model_1.default);
unit_bathroom_feature_model_1.default.belongsTo(feature_model_1.default);
unit_model_1.default.hasOne(unit_bedroom_model_1.default);
unit_bedroom_model_1.default.belongsTo(unit_model_1.default);
unit_model_1.default.hasMany(unit_board_model_1.default);
unit_board_model_1.default.belongsTo(unit_model_1.default);
unit_model_1.default.hasMany(unit_term_model_1.default);
unit_term_model_1.default.belongsTo(unit_model_1.default);
unit_model_1.default.hasMany(unit_pool_model_1.default);
unit_pool_model_1.default.belongsTo(unit_model_1.default);
pool_model_1.default.hasMany(unit_pool_model_1.default);
unit_pool_model_1.default.belongsTo(pool_model_1.default);
user_model_1.default.hasMany(unit_model_1.default);
unit_model_1.default.belongsTo(user_model_1.default);
category_model_1.default.hasMany(unit_model_1.default);
unit_model_1.default.belongsTo(category_model_1.default);
user_model_1.default.hasMany(charge_model_1.default);
charge_model_1.default.belongsTo(user_model_1.default);
promo_code_model_1.default.hasMany(charge_model_1.default);
charge_model_1.default.belongsTo(promo_code_model_1.default);
user_model_1.default.hasMany(reservation_model_1.default);
reservation_model_1.default.belongsTo(user_model_1.default);
unit_model_1.default.hasMany(reservation_model_1.default);
reservation_model_1.default.belongsTo(unit_model_1.default);
reservation_model_1.default.hasOne(charge_model_1.default);
charge_model_1.default.belongsTo(reservation_model_1.default);
image_model_1.default.belongsToMany(unit_model_1.default, {
    through: "unit_image",
    timestamps: false,
});
unit_model_1.default.belongsToMany(image_model_1.default, {
    through: "unit_image",
    timestamps: false,
});
user_model_1.default.hasMany(bookmark_model_1.default);
bookmark_model_1.default.belongsTo(user_model_1.default);
unit_model_1.default.hasMany(bookmark_model_1.default);
bookmark_model_1.default.belongsTo(unit_model_1.default);
user_model_1.default.hasMany(send_email_model_1.default);
send_email_model_1.default.belongsTo(user_model_1.default);
city_model_1.default.hasOne(rated_city_model_1.default);
rated_city_model_1.default.belongsTo(city_model_1.default);
image_model_1.default.hasOne(rated_city_model_1.default);
rated_city_model_1.default.belongsTo(image_model_1.default);
image_model_1.default.hasOne(cover_model_1.default);
cover_model_1.default.belongsTo(image_model_1.default);
//# sourceMappingURL=db.js.map