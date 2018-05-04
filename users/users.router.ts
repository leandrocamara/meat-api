
import {Router} from '../common/router'
import * as restify from 'restify'
import {User} from './users.model'

/**
 * Rotas do recurso "User".
 */
class UsersRouter extends Router {

  /**
   * Aplica as rotas do recurso "Users" ao Servidor.
   *
   * @param application
   */
  applyRoutes(application: restify.Server) {

    /**
     * Retorna todos os usuários.
     */
    application.get('/users', (req, resp, next) => {

      User.find().then(users => {
        resp.json(users)
        return next()
      })
    })

    /**
     * Retorna o usuário conforme o "id" informado.
     */
    application.get('/users/:id', (req, resp, next) => {

      User.findById(req.params.id).then(user => {

        if (user) {
          resp.json(user)
          return next()
        }

        resp.send(404)
        return next()
      })

    })

  }

}

export const usersRouter = new UsersRouter()
