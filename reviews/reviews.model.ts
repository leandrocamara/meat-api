
import * as mongoose from 'mongoose'
import { User } from '../users/users.model'
import { Restaurant } from '../restaurants/restaurants.model'

/**
 * Interface que representa o Documento "Review".
 */
export interface Review extends mongoose.Document {
  date: Date,
  rating: number,
  comments: string,
  restaurant: mongoose.Types.ObjectId | Restaurant,
  user: mongoose.Types.ObjectId | User
}

/**
 * Schema: Define as propriedades (metadados) dos documentos.
 */
const reviewSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comments: {
    type: String,
    required: true,
    maxlength: 500
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

/**
 * Exporta o Model "Review", que faz uso do Schema "reviewSchema".
 * O Model serve para manipular os Documentos da Collection.
 * O Mongoose utilizará o nome do Model para definir o nome (no plural) da Collection.
 */
export const Review = mongoose.model<Review>('Review', reviewSchema)
