"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Realiza o tratamento e formatação dos erros retornados nas respostas das requisições.
 *
 * @param req
 * @param resp
 * @param err
 * @param done
 */
exports.handleError = (req, resp, err, done) => {
    err.toJSON = () => {
        return {
            message: err.message
        };
    };
    switch (err.name) {
        case 'MongoError':
            if (err.code === 11000) {
                err.statusCode = 400;
            }
            break;
        case 'ValidationError':
            err.statusCode = 400;
            break;
    }
    done();
};
//# sourceMappingURL=error.handler.js.map