
import * as restify from 'restify'
import { User } from './users.model'
import { ModelRouter } from '../common/model-router'

/**
 * Rotas do recurso "User".
 */
class UsersRouter extends ModelRouter<User> {

  /**
   * Método construtor.
   */
  constructor () {
    super(User)
    this.on('beforeRender', document => {
      document.password = undefined
      // delete document.password
    })
  }

  /**
   * Retorna todos os usuário filtrando por "e-mail".
   */
  findByEmail = (req, resp, next) => {
    if (req.query.email) {
      User.find({ email: req.query.email })
        .then(this.renderAll(resp, next))
        .catch(next)
    } else {
      next()
    }
  }

  /**
   * Aplica as rotas do recurso "Users" ao Servidor.
   *
   * @param application
   */
  applyRoutes (application: restify.Server) {

    application.get({ path: '/users', version: '2.0.0' }, [this.findByEmail, this.findAll])
    application.get({ path: '/users', version: '1.0.0' }, this.findAll)
    application.get('/users/:id', [this.validateId, this.findById])
    application.post('/users', this.save)
    application.put('/users/:id', [this.validateId, this.replace])
    application.patch('/users/:id', [this.validateId, this.update])
    application.del('/users/:id', [this.validateId, this.delete])

  }

}

export const usersRouter = new UsersRouter()
