//Load All Routes
import cityrouter from "./cities/city.router"
import countryrouter from "./countries/country.router"
import districtrouter from "./districts/district.router"
import categoryrouter from "./categories/category.router"
import devicerouter from "./devices/device.router"

import transactionrouter from "./charges/charge.router"
import featurerouter from "./features/feature.router"
import UnitRouter from "./unit/unit.router"
import userrouter from "./users/user.router"
import inforouter from "./infos/info.router"
import notificationRouter from "./notifications/notification.router"
import MediaRouter from "./media/media.router"
import statsRouter from "./stats/stats.router"

import UnitLocationRouter from "./unit-location/unit-location.router"
import ChargeRouter from "./charges/charge.router"
import ReservationRouter from "./reservations/reservation.router"
import PromoCodeRouter from "./promo-codes/promo-code.router"
import ImageRouter from "./image/image.router"

import bookmarkRouter from "./bookmark/bookmark.router"
import NotifyRouter from "./notify/notify.router"

import UnitFeatureRouter from "./unit-features/unit-features.router";
import UnitKitchenRouter from "./unit-kitchen-features/unit-kithchen-features.router";
import UnitBathroomRouter from "./unit-bathroom-features/unit-bathroom-features.router";
import PoolRouter from "./pools/pool.router";
import UnitPoolRouter from "./unit-pools/unit-pool.router";
import UnitBedroomRouter from "./unit-bedrooms/unit-bedroom.router"
import UnitBoardRouter from "./unit-boards/unit-board.router";
import UnitTermRouter from "./unit-terms/unit-term.router";
import BookmarkRouter from "./bookmark/bookmark.router";
import RatedCityRouter from "./rated-cities/rated-city.router";
import CoverRouter from "./covers/cover.router";
import CheckoutRouter from "./checkout/checkout.router";
import ContactRouter from "./contacts/contact.router";

export default {
  cityrouter,
  districtrouter,
  countryrouter,
  categoryrouter,
  devicerouter,
  transactionrouter,
  featurerouter,
  UnitRouter,
  userrouter,
  inforouter,
  notificationRouter,
  MediaRouter,
  statsRouter,
  UnitLocationRouter,
  ChargeRouter,
  ReservationRouter,
  PromoCodeRouter,

  ImageRouter,
  bookmarkRouter,
  NotifyRouter,

  UnitFeatureRouter,
  UnitBathroomRouter,
  UnitKitchenRouter,
  PoolRouter,
  UnitPoolRouter,
  UnitBedroomRouter,
  UnitBoardRouter,
  UnitTermRouter,
  BookmarkRouter,
  RatedCityRouter,
  CoverRouter,
  CheckoutRouter,

  ContactRouter,
}
