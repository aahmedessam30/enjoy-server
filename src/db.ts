import User from "./models/user.model"
import City from "./models/city.model"
import District from "./models/district.model"
import Country from "./models/country.model"
import Category from "./models/category.model"
import Device from "./models/device.model"
import Charge from "./models/charge.model"
import Notification from "./models/notification.model"
import Reservation from "./models/reservation.model"
import UnitLocation from "./models/unit-location.model"
import Unit from "./models/unit.model"
import Feature from "./models/feature.model"
import OTP from "./models/otp.model"
import Info from "./models/info.model"

import PromoCode from "./models/promo-code.model"
import Facility from "./models/facility.model"
import Image from "./models/image.model"
import Bookmark from "./models/bookmark.model"
import SendEmail from "./models/send-email.model"
import UnitBathroomFeature from "./models/unit-bathroom-feature.model";
import UnitKitchenFeature from "./models/unit-kitchen-feature.model";
import UnitBoard from "./models/unit-board.model"
import UnitBedroom from "./models/unit-bedroom.model";
import Pool from "./models/pool.model";
import UnitPool from "./models/unit-pool.model"
import UnitTerm from "./models/unit-term.model";
import RatedCity from "./models/rated-city.model";
import Cover from "./models/cover.model"
import Contact from "./models/contact.model"

Country.hasMany(City)
City.belongsTo(Country)

City.hasMany(District)
District.belongsTo(City)

Country.hasMany(Category)
Category.belongsTo(Country)

User.hasMany(Device)
Device.belongsTo(User)

User.belongsToMany(Notification, {
  through: "user_notifications",
  timestamps: false,
})

Notification.belongsToMany(User, {
  through: "user_notifications",
  timestamps: false,
})

Country.hasMany(UnitLocation)
UnitLocation.belongsTo(Country)

City.hasMany(UnitLocation)
UnitLocation.belongsTo(City)

District.hasMany(UnitLocation)
UnitLocation.belongsTo(District)

Unit.hasOne(UnitLocation)
UnitLocation.belongsTo(Unit)

Unit.belongsToMany(Feature, {
  through: "unit_features",
  timestamps: false,
})

Feature.belongsToMany(Unit, {
  through: "unit_features",
  timestamps: false,
})

Unit.hasMany(UnitKitchenFeature)
UnitKitchenFeature.belongsTo(Unit)

Feature.hasMany(UnitKitchenFeature)
UnitKitchenFeature.belongsTo(Feature)

Unit.hasMany(UnitBathroomFeature)
UnitBathroomFeature.belongsTo(Unit)

Feature.hasMany(UnitBathroomFeature)
UnitBathroomFeature.belongsTo(Feature)

Unit.hasOne(UnitBedroom)
UnitBedroom.belongsTo(Unit)

Unit.hasMany(UnitBoard)
UnitBoard.belongsTo(Unit)

Unit.hasMany(UnitTerm)
UnitTerm.belongsTo(Unit)

Unit.hasMany(UnitPool)
UnitPool.belongsTo(Unit)

Pool.hasMany(UnitPool)
UnitPool.belongsTo(Pool)

User.hasMany(Unit)
Unit.belongsTo(User)

Category.hasMany(Unit)
Unit.belongsTo(Category)

User.hasMany(Charge)
Charge.belongsTo(User)

PromoCode.hasMany(Charge)
Charge.belongsTo(PromoCode)

User.hasMany(Reservation)
Reservation.belongsTo(User);

Unit.hasMany(Reservation);
Reservation.belongsTo(Unit);

Reservation.hasOne(Charge);
Charge.belongsTo(Reservation);

Image.belongsToMany(Unit, {
  through: "unit_image",
  timestamps: false,
})
Unit.belongsToMany(Image, {
  through: "unit_image",
  timestamps: false,
})

User.hasMany(Bookmark)
Bookmark.belongsTo(User)

Unit.hasMany(Bookmark)
Bookmark.belongsTo(Unit)

User.hasMany(SendEmail)
SendEmail.belongsTo(User);

City.hasOne(RatedCity);
RatedCity.belongsTo(City);

Image.hasOne(RatedCity);
RatedCity.belongsTo(Image);

Image.hasOne(Cover);
Cover.belongsTo(Image);

export {
  User,
  City,
  District,
  Country,
  Category,
  Device,

  Charge,
  Notification,
  Reservation,
  UnitLocation,
  Unit,
  Feature,
  OTP,
  Info,
  PromoCode,
  Facility,
  Image,
  Bookmark,
  SendEmail,
  UnitBathroomFeature,
  UnitKitchenFeature,
  UnitBoard,
  UnitBedroom,
  Pool,
  UnitPool,
  UnitTerm,
  RatedCity,
  Cover,
  Contact
}
