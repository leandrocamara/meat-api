"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const environment_1 = require("../common/environment");
/**
 * Criptografa a senha do usuário.
 *
 * @param obj
 * @param next
 */
const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environment_1.environment.security.saltRounds)
        .then(hash => {
        obj.password = hash;
        next();
    }).catch(next);
};
/**
 * Middleware responsável por criptografar a senha na operação "Save".
 *
 * @param next
 */
const saveMiddleware = function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        hashPassword(user, next);
    }
};
exports.saveMiddleware = saveMiddleware;
/**
 * Middleware responsável por criptografar a senha na operação "Update".
 *
 * @param next
 */
const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next();
    }
    else {
        hashPassword(this.getUpdate(), next);
    }
};
exports.updateMiddleware = updateMiddleware;
//# sourceMappingURL=users.middleware.js.map