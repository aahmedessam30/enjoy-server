import aws from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3"
import uuid from "uuid"
import { s3Config } from "../config"

function UploadImage() {
  this.spacesEndpoint = new aws.Endpoint("fra1.digitaloceanspaces.com/uploads/images")
  this.s3 = new aws.S3({
    endpoint: this.spacesEndpoint,
    ...s3Config,
  })

  this.uploadImage = multer({
    storage: multerS3({
      s3: this.s3,
      bucket: "darkkom",
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname, contentType: "image/jpeg" })
      },
      key: function (request, file, cb) {
        cb(null, uuid.v4() + "-" + new Date().toLocaleDateString() + ".png")
      },
    }),
  }).array("avatar", 1)

  this.uploadImages = multer({
    storage: multerS3({
      s3: this.s3,
      bucket: "darkkom",
      acl: "public-read",
      contentType: function (req, file, cb) {
        cb(null, "image/jpg")
      },
      key: function (request, file, cb) {
        cb(null, uuid.v4() + "-" + new Date().toLocaleDateString() + ".png")
      },
    }),
  }).array("images", 30)
}

export default UploadImage
