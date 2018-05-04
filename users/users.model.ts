
import * as mongoose from 'mongoose'

/**
 * Interface que representa o Documento "User".
 */
export interface User extends mongoose.Document {

  name: string,
  email: string,
  password: string

}

/**
 * Schema: Define as propriedades (metadados) dos documentos.
 */
const userSchema = new mongoose.Schema({

  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, select: false }

})

/**
 * Exporta o Model "User", que faz uso do Schema "userSchema".
 * O Model serve para manipular os Documentos da Collection.
 * O Mongoose utilizará o nome do Model para definir o nome (no plural) da Collection.
 */
export const User = mongoose.model<User>('User', userSchema)
