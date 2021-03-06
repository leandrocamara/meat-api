"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
const mpContentType = 'application/merge-path+json';
/**
 * Callback responsável por converter os dados (body) da requisição (PATCH) em JSON.
 *
 * @param req
 * @param resp
 * @param next
 */
exports.mergePatchBodyParser = (req, resp, next) => {
    if (req.getContentType() === mpContentType && req.method === 'PATCH') {
        req.rawBody = req.body;
        try {
            req.body = JSON.parse(req.body);
        }
        catch (error) {
            return next(new restify_errors_1.BadRequestError(`Invalid content: ${error.message}`));
        }
    }
    return next();
};
//# sourceMappingURL=merge-patch.parser.js.map