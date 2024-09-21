import { GenerateError } from "../../../services/services"
import * as db from "../../../db"
import MainProvider from "../index.provider"
import { CreateImageDto } from './dtos/create-image.dto';

export default class ImageProvider extends MainProvider {
  constructor() {
    super("image")
  }
  async add({ module, moduleId, images }) {
    const result = await db[module].findByPk(moduleId, { include: db.Image })
    if (!result) {
      GenerateError({ message: this._i18n("notFound"), code: 404 })
    }
    const imageIds = await db.Image.bulkCreate(images)
    await result.addImage(imageIds, { through: { selfGranted: false } })
    return { result: imageIds }
  }

  async addSingle (createImageDto: CreateImageDto) {
    const image = await db.Image.create(createImageDto);
    return { image };
  }

  async remove({ imageId }) {
    const image = await db.Image.findByPk(imageId)
    if (!image) {
      GenerateError({ message: this._i18n("imageNotFound"), code: 404 })
    }
    await db.Image.destroy({ where: { id: imageId } })
  }
}
