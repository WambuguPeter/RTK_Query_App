import jsonwebtoken from "jsonwebtoken";
import { notAuthorized, sendBadRequest } from "../helper/helperFunctions.js";

export const authMiddleware = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT") {
        jsonwebtoken.verify(req.headers.authorization.split(" ")[1], `${process.env.JWT_SECRET}`,
            (err, decode) => {
                if (err) {
                    notAuthorized(res, "Invalid token!");
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        notAuthorized(res, "No token provided!");
    }
};
