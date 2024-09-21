import { Request, Response, NextFunction } from "express"
import aws from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3"
import * as uuid from "uuid"
import moment from "moment"
import path from "path"
import sharp from "sharp"
import { s3Config } from "../../../config"

export default class Media {
  spacesEndpoint: aws.Endpoint
  constructor({ url }) {
    this.spacesEndpoint = new aws.Endpoint(url)
  }
  s3 = (): aws.S3 => {
    return new aws.S3({
      endpoint: this.spacesEndpoint,
      credentials: {
        ...s3Config,
      },
    })
  }
  uploadImage = () => {
    return multer({
      storage: multerS3({
        s3: this.s3(),
        bucket: "enjoy",
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname, contentType: file.mimetype })
        },
        key: function (request, file, cb) {
          const fileext = /[.]/.exec(file.originalname || "") ? /[^.]+$/.exec(file.originalname || "") : []
          const ext = fileext[0] && fileext[0] === "pdf" ? ".pdf" : ".png"
          cb(null, uuid.v4() + "-" + moment(new Date().toISOString()).format("DDMMYYYY") + ext)
        },
      }),
    }).array("image", 1)
  }

  uploadImages = () => {
    return multer({
      storage: multerS3({
        s3: this.s3(),
        bucket: "enjoy",
        acl: "public-read",
        contentType: function (req, file, cb) {
          cb(null, "image/jpg")
        },
        key: function (request, file, cb) {
          const fileext = /[.]/.exec(file.originalname || "") ? /[^.]+$/.exec(file.originalname || "") : []
          const ext = fileext[0] && fileext[0] === "pdf" ? ".pdf" : ".png"
          cb(null, uuid.v4() + "-" + moment(new Date().toISOString()).format("DDMMYYYY") + ext)
        },
      }),
    }).array("images", 20)
  }

  ImageWatermark = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const image = req.files[0]
      await this.uploadImageS3(image)
        .then((data) => {
          const folder = req.body.folder || "enjoy"
          const d = {
            message: "image created",
            payload: {
              image: { key: `${folder}/${data.Key}`, url: data.Location },
            },
            status: "success",
          }
          res.status(200).json(d)
        })
        .catch((err) => {
          res.status(500).json({ msg: "Server Error", error: err })
        })
    } catch (err) {
      res.status(500).json({ msg: "Server Error", error: err })
    }
  }
  ImagesWatermark = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let result = []
      for (let index = 0; index < req.files.length; index++) {
        const image = req.files[index]
        await this.uploadImageS3(image)
          .then((data) => {
            const folder = req.body.folder || "enjoy"
            result.push({ key: `${folder}/${data.Key}`, url: data.Location })
          })
          .catch((err) => {})
      }
      res.status(200).json({ message: "images created", payload: { images: result, }, status: "success", })
    } catch (err) {
      res.status(500).json({ msg: "Server Error", error: err })
    }
  }
  smallImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const image = req.files[0]
      await this.uploadImageS3(image, false)
        .then((data) => {
          const folder = req.body.folder || "enjoy"
          const d = {
            message: "image uploaded",
            payload: {
              image: { key: `${folder}/${data.Key}`, url: data.Location },
            },
            status: "success",
          }
          res.status(200).json(d)
        })
        .catch((err) => {
          res.status(500).json({ msg: "server error", error: err })
        })
    } catch (err) {
      res.status(500).json({ msg: "server error", error: err })
    }
  }
  uploadImageS3 = async (image: any, withWatermark: boolean = true) => {
    const file = await this.resizeImg(image, withWatermark)
    let s3bucket = this.s3()
    const params = {
      Bucket: "enjoy",
      Key: uuid.v4() + "-" + moment(new Date().toISOString()).format("DDMMYYYY") + path.extname(image.originalname),
      Body: file,
      ContentType: image.mimetype,
      ACL: "public-read",
    }
    return s3bucket.upload(params).promise()
  }
  resizeImg = async (image, withWatermark: boolean = true) => {
    try {
      const metadata = await sharp(image.buffer).resize(1000).metadata()

      const label = Buffer.from(`<svg width="1" height="1"></svg>`)
      const watermark = withWatermark
        ? await sharp(path.join(__dirname, "../../../../assets/water_mark.png"))
            .resize(25)
            .sharpen()
            .withMetadata()
            .toBuffer()
        : label
      const file = await sharp(image.buffer)
        .resize(1000)
        .composite([
          {
            input: watermark,
            gravity: "southeast",
          },
        ])
        [metadata.format == "png" ? "png" : "jpeg"]({ quality: 80 })
        .sharpen()
        .withMetadata()
        .toBuffer()
      return file
    } catch (err) {}
  }
}
