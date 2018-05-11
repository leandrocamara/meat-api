"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
/**
 * Schema: Define as propriedades (metadados) dos documentos.
 */
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
/**
 * Schema: Define as propriedades (metadados) dos documentos.
 */
const restSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    menu: {
        type: [menuSchema],
        required: false,
        select: false,
        default: []
    }
});
/**
 * Exporta o Model "Restaurant", que faz uso do Schema "restSchema".
 * O Model serve para manipular os Documentos da Collection.
 * O Mongoose utilizará o nome do Model para definir o nome (no plural) da Collection.
 */
exports.Restaurant = mongoose.model('Restaurant', restSchema);
//# sourceMappingURL=restaurants.model.js.map