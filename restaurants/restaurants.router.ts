
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

    application.get('/restaurants', this.findAll)
    application.get('/restaurants/:id', [this.validateId, this.findById])
    application.post('/restaurants', this.save)
    application.put('/restaurants/:id', [this.validateId, this.replace])
    application.patch('/restaurants/:id', [this.validateId, this.update])
    application.del('/restaurants/:id', [this.validateId, this.delete])

    application.get('/restaurants/:id/menu', [this.validateId, this.findMenu])
    application.put('/restaurants/:id/menu', [this.validateId, this.replaceMenu])

  }

}

export const restaurantsRouter = new RestaurantsRouter()
