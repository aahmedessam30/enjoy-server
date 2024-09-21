import Sequelize, { DataTypes, Model } from "sequelize"
import sequelize from "."
import moment from "moment"
import {
  DedicatedToType,
  IUnit,
  UnitPlatform,
  UnitStatus,
} from "../interfaces/unit.interface"
import { IImage } from "../interfaces/image.interface"
import Feature from "./feature.model"

export default class Unit extends Model<IUnit> implements IUnit {
  declare readonly id: string
  declare titleAr: string
  declare titleEn: string
  declare appVersion?: string
  declare categoryId?: string | null
  declare details: string
  declare platform?: UnitPlatform
  declare dedicatedTo: DedicatedToType;
  declare priceByDay: number
  declare tax: number
  declare discount: number
  declare space: number
  declare totalPriceByDay: number
  declare userId?: string | null
  declare status: UnitStatus
  declare code: number
  declare insurance: boolean
  declare cancelReservation: boolean
  declare views: number;
  declare bathroomCount: number;
  declare createdAt?: Date
  declare updatedAt?: Date
  declare images?: IImage[] | null;

  declare addFeature: Sequelize.HasManyAddAssociationsMixin<Feature, string>;
  declare getFeatures: Sequelize.BelongsToManyGetAssociationsMixin<Feature>;
}

Unit.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    code: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    titleAr: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    titleEn: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    priceByDay: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0
    },
    totalPriceByDay: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    dedicatedTo: {
      type: DataTypes.ENUM(...Object.values(DedicatedToType)),
      allowNull: false,
      defaultValue: DedicatedToType.SINGLES,
    },
    space: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(UnitStatus)),
      allowNull: false,
      defaultValue: UnitStatus.PENDING,
    },
    platform: {
      type: DataTypes.ENUM(...Object.values(UnitPlatform)),
    },
    appVersion: {
      type: DataTypes.STRING(100),
    },
    insurance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    cancelReservation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false 
    },
    views: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    bathroomCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  },
  {
    sequelize,
    modelName: "unit",
    // hooks: {
    //   beforeCreate: async (prop) => checkDuration(prop),
    // },
  },
)

async function checkDuration(prop): Promise<void> {
  return await new Promise(async (resolve, reject) => {
    try {
      await Unit.findOne({
        where: { userId: prop.userId },
        attributes: ["createdAt"],
        order: [["createdAt", "DESC"]],
      }).then(async (response: any) => {
        if (!response) {
          resolve()
        } else {
          const createAtAfterDuration = moment(response.createdAt).add(moment.duration(2, "minutes"))
          // console.log("if is after date", createAtAfterDuration.isAfter(moment()))
          if (createAtAfterDuration.isAfter(moment())) {
            reject("you must wait for duration")
          } else {
            resolve()
          }
        }
      })
    } catch (error) {
      reject("error happened in check duration")
    }
  })
}
