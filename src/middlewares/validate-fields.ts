import { GenerateError } from "../services/services"
import { ValidationChain, validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"
/**
 * Express validator if has error or not
 * @returns next || GenerateError Validation Faild
 */
const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    GenerateError({ message: "Validation Faild", code: 422, errors: errors.array() })
  } else {
    return next()
  }
}
/**
 * Express validator if has error or not
 * parallel processing
 * @returns next || GenerateError Validation Faild
 */
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(422).json({ message: "validation faild", errors: errors.array() })
  }
}

export default validateFields
