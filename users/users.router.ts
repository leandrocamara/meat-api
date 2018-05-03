
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

      User.findAll().then(users => {
        resp.json(users)
        return next()
      })

    })

  }

}

export const usersRouter = new UsersRouter()
