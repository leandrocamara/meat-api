
import { Router } from './router'
import * as mongoose from 'mongoose'
import { NotFoundError } from 'restify-errors'

/**
 * Classe que realiza operações genéricas do modelo (<D>) especificado pela classe especializa.
 */
export abstract class ModelRouter<D extends mongoose.Document> extends Router {

  /**
   * Define o modelo a ser utilizado pelo métodos genéricos.
   *
   * @param model
   */
  constructor (protected model: mongoose.Model<D>) {
    super()
  }

  /**
   * Prepara a consulta antes de realizar a operação no BD.
   *
   * @param query
   */
  protected prepareOne (query: mongoose.DocumentQuery<D, D>): mongoose.DocumentQuery<D, D> {
    return query
  }

  /**
   * Verifica se o "id" informado é válido.
   */
  validateId = (req, resp, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      next(new NotFoundError('Documento não encontrado.'))
    } else {
      next()
    }
  }

  /**
   * Retorna uma lista de documentos.
   */
  findAll = (req, resp, next) => {
    this.model.find()
      .then(this.renderAll(resp, next))
      .catch(next)
  }

  /**
   * Retorna o documento conforme o "id" informado.
   */
  findById = (req, resp, next) => {
    this.prepareOne(this.model.findById(req.params.id))
      .then(this.render(resp, next))
      .catch(next)
  }

  /**
   * Salva um documento.
   */
  save = (req, resp, next) => {
    let document = new this.model(req.body)
    document.save()
      .then(this.render(resp, next))
      .catch(next)
  }

  /**
   * Atualiza todos os dados de um documento.
   */
  replace = (req, resp, next) => {
    const options = { runValidators: true, overwrite: true }
    this.model.update({ _id: req.params.id }, req.body, options).exec().then(result => {
      if (result.n) {
        return this.model.findById(req.params.id)
      } else {
        throw new NotFoundError('Documento não encontrado.')
      }
    }).then(this.render(resp, next)).catch(next)
  }

  /**
   * Atualizar os dados de um documento de forma parcial.
   */
  update = (req, resp, next) => {
    const options = { runValidators: true, new: true }
    this.model.findByIdAndUpdate(req.params.id, req.body, options)
      .then(this.render(resp, next))
      .catch(next)
  }

  /**
   * Remove um documento.
   */
  delete = (req, resp, next) => {
    this.model.remove({ _id: req.params.id }).exec().then((cmdResult: any) => {
      if (cmdResult.result.n) {
        resp.send(204)
      } else {
        throw new NotFoundError('Documento não encontrado.')
      }
      return next()
    }).catch(next)
  }

}
