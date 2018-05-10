
import { Router } from '../common/router'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'
import { User } from './users.model'

/**
 * Rotas do recurso "User".
 */
class UsersRouter extends Router {

  constructor () {
    super()
    this.on('beforeRender', document => {
      document.password = undefined
      // delete document.password
    })
  }

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

      User.find()
        .then(this.render(resp, next))
        .catch(next)
    })

    /**
     * Retorna o usuário conforme o "id" informado.
     */
    application.get('/users/:id', (req, resp, next) => {

      User.findById(req.params.id)
        .then(this.render(resp, next))
        .catch(next)
    })

    /**
     * Salva um usuario.
     */
    application.post('/users', (req, resp, next) => {
      let user = new User(req.body)
      user.save()
        .then(this.render(resp, next))
        .catch(next)
    })

    /**
     * Atualiza todos os dados de um usuário.
     */
    application.put('/users/:id', (req, resp, next) => {
      const options = { runValidators: true, overwrite: true }
      User.update({ _id: req.params.id }, req.body, options).exec().then(result => {
        if (result.n) {
          return User.findById(req.params.id)
        } else {
          throw new NotFoundError('Documento não encontrado.')
        }
      }).then(this.render(resp, next)).catch(next)
    })

    /**
     * Atualizar os dados de um usuário de forma parcial.
     */
    application.patch('/users/:id', (req, resp, next) => {
      const options = { runValidators: true, new: true }
      User.findByIdAndUpdate(req.params.id, req.body, options)
        .then(this.render(resp, next))
        .catch(next)
    })

    /**
     * Remove um usuário.
     */
    application.del('/users/:id', (req, resp, next) => {
      User.remove({ _id: req.params.id }).exec().then((cmdResult: any) => {
        if (cmdResult.result.n) {
          resp.send(204)
        } else {
          throw new NotFoundError('Documento não encontrado.')
        }
        return next()
      }).catch(next)
    })

  }

}

export const usersRouter = new UsersRouter()
