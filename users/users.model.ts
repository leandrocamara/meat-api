
import * as mongoose from 'mongoose'
import { validateCPF } from '../common/validators'
import * as bcrypt from 'bcrypt'
import { environment } from '../common/environment'

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
      validator: validateCPF,
      message: '{PATH}: Invalid CPF ({VALUE})'
    }
  }

})

userSchema.pre('save', function (next) {
  const user: User = this

  if (!user.isModified('password')) {
    next()
  } else {
    bcrypt.hash(user.password, environment.security.saltRounds)
      .then(hash => {

      })
  }
})

/**
 * Exporta o Model "User", que faz uso do Schema "userSchema".
 * O Model serve para manipular os Documentos da Collection.
 * O Mongoose utilizará o nome do Model para definir o nome (no plural) da Collection.
 */
export const User = mongoose.model<User>('User', userSchema)
