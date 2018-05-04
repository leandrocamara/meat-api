"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
/**
 * Schema: Define as propriedades (metadados) dos documentos.
 */
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String, select: false }
});
/**
 * Exporta o Model "User", que faz uso do Schema "userSchema".
 * O Model serve para manipular os Documentos da Collection.
 * O Mongoose utilizará o nome do Model para definir o nome (no plural) da Collection.
 */
exports.User = mongoose.model('User', userSchema);
//# sourceMappingURL=users.model.js.map