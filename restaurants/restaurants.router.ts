
import * as restify from 'restify'
import { Restaurant } from './restaurants.model'
import { ModelRouter } from '../common/model-router'
import { NotFoundError } from 'restify-errors'

/**
 * Rotas do recurso "Restaurant".
 */
class RestaurantsRouter extends ModelRouter<Restaurant> {

  /**
   * Método construtor.
   */
  constructor () {
    super(Restaurant)
  }

  /**
   * Método responsável por encapsular os dados de hypermedia do recurso Restaurant.
   *
   * @param document
   */
  envelope (document) {
    let resource = super.envelope(document)
    resource._links.menu = `${this.basePath}/${resource._id}/menu`
    return resource
  }

  /**
   * Retorna o menu de um Restaurante.
   */
  findMenu = (req, resp, next) => {
    Restaurant.findById(req.params.id, '+menu')
      .then(rest => {
        if (!rest) {
          throw new NotFoundError('Restaurante não encontrado.')
        } else {
          resp.json(rest.menu)
          next()
        }
      }).catch(next)
  }

  /**
   * Atualiza todos os dados do menu do Restaurante.
   */
  replaceMenu = (req, resp, next) => {
    Restaurant.findById(req.params.id)
      .then(rest => {
        if (!rest) {
          throw new NotFoundError('Restaurante não encontrado.')
        } else {
          rest.menu = req.body // ARRAY de MenuItem
          return rest.save()
        }
      }).then(rest => {
        resp.json(rest.menu)
        return next()
      }).catch(next)
  }

  /**
   * Aplica as rotas do recurso "Restaurants" ao Servidor.
   *
   * @param application
   */
  applyRoutes (application: restify.Server) {

    application.get(`${this.basePath}`, this.findAll)
    application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
    application.post(`${this.basePath}`, this.save)
    application.put(`${this.basePath}/:id`, [this.validateId, this.replace])
    application.patch(`${this.basePath}/:id`, [this.validateId, this.update])
    application.del(`${this.basePath}/:id`, [this.validateId, this.delete])

    application.get(`${this.basePath}/:id/menu`, [this.validateId, this.findMenu])
    application.put(`${this.basePath}/:id/menu`, [this.validateId, this.replaceMenu])

  }

}

export const restaurantsRouter = new RestaurantsRouter()
