import { validationResult } from "express-validator";
import { APIError } from '../utils/api-error.js';

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()){
        return next();
    }

    const extractErrors = [];
    errors.array().map((err) => extractErrors.push(
        {
            [err.path]: err.msg,
        }
    ));

    throw new APIError(422, "Received data is not valid", extractErrors);
}