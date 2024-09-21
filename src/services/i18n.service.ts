import path from "path"
import fs from "fs"

/**
 * @description - This function is used to get the i18n data
 * @param text module name & key ex: $_user|notfound
 * @param lang language code "en" or "ar"
 * @returns translated text
 */
export function i18nTranslator(text: string, lang: lang = "ar"): string {
  try {
    return jsonRead(text.substring(2).split("|"), lang)
  } catch (error) {
    return "error happened ..."
  }
}

function jsonRead(module_key: string[], lang: lang): string {
  const jsonPath = path.join(__dirname, `../../assets/i18n/${module_key[0]}/${lang}.json`)
  const dataFile = JSON.parse(fs.readFileSync(jsonPath, "utf8").trim())
  return dataFile[module_key[1]] ? dataFile[module_key[1]] : "error happened"
}
