//Business logic for all Cover routes
import { Cover, Image } from "../../../db";
import { CoverStatus } from "../../../interfaces/cover.interface";
import { GenerateError } from "../../../services/error"
import MainProvider from "../index.provider"
import { CreateCoverDto } from "./dtos/create-cover.dto"

export default class CoverProvider extends MainProvider {
  constructor() {
    super("cover")
  }

  async list () {
    const {rows, count} = await Cover.findAndCountAll({
      attributes: ['id', 'createdAt'],
      where: { status: CoverStatus.ACTIVE },
      include: [
        { model: Image, attributes: ['id', this.concatImg("url")], },
      ]
    });
    return { covers: count > 0 ? rows : [] }
  }

  async create (createCoverDto: CreateCoverDto) {
    const cover = await Cover.create(createCoverDto);
    return { cover }
  }

  async remove ({coverId}) {
    const cover = await Cover.findByPk(coverId);
    if (!cover) {
      GenerateError({ message: this._i18n("coverNotFound"), code: 404 })
    }
    cover.status = CoverStatus.DELETED;
    await cover.save();
  }
}
