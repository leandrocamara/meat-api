"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validators_1 = require("../common/validators");
const users_middleware_1 = require("./users.middleware");
/**
 * Schema: Define as propriedades (metadados) dos documentos.
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female']
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validators_1.validateCPF,
            message: '{PATH}: Invalid CPF ({VALUE})'
        }
    }
});
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email }); // { email: email }
};
/**
 * Registra os Middlewares a serem executados antes das operações "Save" e "Update".
 */
userSchema.pre('save', users_middleware_1.saveMiddleware);
userSchema.pre('findOneAndUpdate', users_middleware_1.updateMiddleware);
userSchema.pre('update', users_middleware_1.updateMiddleware);
/**
 * Exporta o Model "User", que faz uso do Schema "userSchema".
 * O Model serve para manipular os Documentos da Collection.
 * O Mongoose utilizará o nome do Model para definir o nome (no plural) da Collection.
 */
exports.User = mongoose.model('User', userSchema);
//# sourceMappingURL=users.model.js.map