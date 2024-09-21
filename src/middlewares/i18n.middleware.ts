import { Request, Response, NextFunction } from "express"
import { i18nTranslator } from "../services/i18n.service"

/**
 * Set language to request
 * @returns next
 */
export function i18nApply(req: Request, res: Response, next: NextFunction) {
  const lang: lang = `${req.headers.lang}` as lang
  if (["en", "ar"].includes(String(lang))) {
    req.lang = lang
  } else {
    req.lang = "ar"
  }
  // override response
  const oldSend = res.send
  res.send = function (data) {
    // parse response json
    const oldData = JSON.parse(arguments[0])
    // check if response message can translate
    if (oldData.message && typeof oldData.message === "string" && oldData.message.startsWith("$_")) {
      // translate response message
      oldData.message = i18nTranslator(oldData.message, req.lang)
      // put new message to response
      arguments[0] = JSON.stringify(oldData)
      // apply new modified response
      return oldSend.apply(res, arguments)
    } else {
      // apply old response
      return oldSend.apply(res, arguments)
    }
  }
  next()
}
