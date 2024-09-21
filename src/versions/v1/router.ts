import routes from "./routes"
import { Router } from "express"

export class MainRouter {
  router: Router
  constructor() {
    this.router = Router();
    this.routes()
  }
  routes() {
    this.router.use(new routes.cityrouter().router)
    this.router.use(new routes.RatedCityRouter().router)

    this.router.use("/countries", new routes.countryrouter().router)
    this.router.use(new routes.districtrouter().router)
    this.router.use(new routes.categoryrouter().router)
    this.router.use(new routes.devicerouter().router)

    this.router.use(new routes.transactionrouter().router)
    this.router.use(new routes.featurerouter().router)
    this.router.use(new routes.UnitRouter().router)
    this.router.use(new routes.UnitFeatureRouter().router)
    this.router.use(new routes.UnitBathroomRouter().router)
    this.router.use(new routes.UnitKitchenRouter().router)
    this.router.use(new routes.PoolRouter().router)
    this.router.use(new routes.UnitPoolRouter().router)
    this.router.use(new routes.UnitBedroomRouter().router)
    this.router.use(new routes.UnitBoardRouter().router)
    this.router.use(new routes.UnitTermRouter().router)
    this.router.use(new routes.CheckoutRouter().router)

    this.router.use(new routes.userrouter().router)
    this.router.use("/info", new routes.inforouter().router)
    this.router.use("/notifications", new routes.notificationRouter().router)
    this.router.use("/contacts", new routes.ContactRouter().router)
    this.router.use(new routes.MediaRouter().router)
    this.router.use(new routes.statsRouter().router)
  
    this.router.use(new routes.UnitLocationRouter().router)

    this.router.use(new routes.ChargeRouter().router)

    this.router.use(new routes.ReservationRouter().router)
    this.router.use(new routes.PromoCodeRouter().router) 

    this.router.use(new routes.ImageRouter().router)
    
    this.router.use(new routes.bookmarkRouter().router)
    this.router.use("/notify", new routes.NotifyRouter().router)

    this.router.use(new routes.CoverRouter().router);
  }
}
