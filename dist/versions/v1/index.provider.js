"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class MainProvider {
    constructor(providerName) {
        this.imgBaseUrl = "https://enjoy.fra1.digitaloceanspaces.com/uploads/";
        this.imgPath = [(0, sequelize_1.fn)("CONCAT", this.imgBaseUrl), "imagepath"];
        this.providerName = providerName;
        this.i18nAssetsNotFound(providerName);
    }
    whereFilters(object, fields) {
        try {
            var _this = this;
            const filters = JSON.parse(String(object));
            if (!object || Object.keys(filters).length === 0)
                return {};
            let where = {};
            Object.keys(filters).map(function (key) {
                if (!fields || fields.includes(key)) {
                    if (key == "name") {
                        where.nameAr = { [sequelize_1.Op.like]: `%${filters[`${key}`]}%` };
                        where.nameEn = { [sequelize_1.Op.like]: `%${filters[`${key}`]}%` };
                    }
                    else if (key.substring(0, 2) == "s_") {
                        const subKey = _this.lowerize(key.slice(2));
                        where[`${subKey}`] = { [sequelize_1.Op.like]: `%${filters[`${key}`]}%` };
                    }
                    else if (key.substring(0, 3) == "min") {
                        const subKey = _this.lowerize(key.slice(3));
                        where[`${subKey}`] = Object.assign(Object.assign({}, where[`${subKey}`]), { [sequelize_1.Op.gte]: Number(filters[`${key}`]) });
                    }
                    else if (key.substring(0, 3) == "max") {
                        const subKey = _this.lowerize(key.slice(3));
                        where[`${subKey}`] = Object.assign(Object.assign({}, where[`${subKey}`]), { [sequelize_1.Op.lte]: Number(filters[`${key}`]) });
                    }
                    else {
                        filters[`${key}`] && (where[`${key}`] = filters[`${key}`]);
                    }
                }
            });
            return where;
        }
        catch (e) {
            return {};
        }
    }
    concatImg(field, col = field) {
        return [(0, sequelize_1.fn)("CONCAT", this.imgBaseUrl, sequelize_1.Sequelize.col(col)), field];
    }
    lowerize(s) {
        return (s && s[0].toLowerCase() + s.slice(1)) || "";
    }
    _i18n(key) {
        return `$_${this.providerName}|${key}`;
    }
    i18nAssetsNotFound(name) {
        if (!fs_1.default.existsSync(path_1.default.join(__dirname, `../../../assets/i18n/${name}`))) {
            throw new Error(`not found in i18n file`);
        }
    }
}
exports.default = MainProvider;
//# sourceMappingURL=index.provider.js.map