
import * as mongoose from 'mongoose'

/**
 * Interface que representa o Subdocumento "MenuItem".
 */
export interface MenuItem extends mongoose.Document {
  name: string,
  price: number
}

/**
 * Interface que representa o Documento "Restaurant".
 */
export interface Restaurant extends mongoose.Document {
  name: string,
  menu: MenuItem[]
}

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
})

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
})

/**
 * Exporta o Model "Restaurant", que faz uso do Schema "restSchema".
 * O Model serve para manipular os Documentos da Collection.
 * O Mongoose utilizará o nome do Model para definir o nome (no plural) da Collection.
 */
export const Restaurant = mongoose.model<Restaurant>('Restaurant', restSchema)
