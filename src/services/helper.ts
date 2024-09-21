import fs from "fs"
import path from "path"
/**
 * Get Enum key by value
 * Like : enum user{
 *          create = "create new user",
 *         }
 * @param enumName Enum ( ex : user )
 * @param value value of enum key ( ex : "create new user" )
 * @returns
 */
export function getEnumKeyByValue(enumName, value: string): string {
  const indexOfS = Object.values(enumName).indexOf(value as unknown)
  const key = Object.keys(enumName)[indexOfS]
  return key || ""
}

export function camelTosnakeCase(text: string): string {
  return text.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

export function readFileSyncHelper(filePath: string): string {
  return fs.readFileSync(path.join(__dirname, filePath), "utf8").trim()
}
