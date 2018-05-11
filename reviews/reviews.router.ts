
import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Review } from './reviews.model'
import { ModelRouter } from '../common/model-router'

/**
 * Rotas do recurso "Review".
 */
class ReviewsRouter extends ModelRouter<Review> {

  /**
   * Método construtor.
   */
  constructor () {
    super(Review)
  }

  /**
   * Prepara a consulta para trazer informações do usuário e do restaurante.
   *
   * @param query
   */
  protected prepareOne (query: mongoose.DocumentQuery<Review, Review>): mongoose.DocumentQuery<Review, Review> {
    return query.populate('user', 'name').populate('restaurant', 'name')
  }

  /**
   * Retorna a Review com informações do usuário e do restaurante, conforme o "id" informado.
   */
  /*findById = (req, resp, next) => {
    this.model.findById(req.params.id)
      .populate('user', 'name')
      .populate('restaurant', 'name')
      .then(this.render(resp, next))
      .catch(next)
  }*/

  /**
   * Aplica as rotas do recurso "Reviews" ao Servidor.
   *
   * @param application
   */
  applyRoutes (application: restify.Server) {

    application.get('/reviews', this.findAll)
    application.get('/reviews/:id', [this.validateId, this.findById])
    application.post('/reviews', this.save)

  }

}

export const reviewsRouter = new ReviewsRouter()
