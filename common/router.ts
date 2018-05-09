
import * as restify from 'restify'
import { EventEmitter } from 'events';
import { NotFoundError } from 'restify-errors';

/**
 * Classe abstrata, herdada por todas as "Routers".
 */
export abstract class Router extends EventEmitter {

  /**
   * Aplica as rotas ao Servidor (application).
   *
   * @param application
   */
  abstract applyRoutes (application: restify.Server)

  /**
   * Método genérico para renderizar o "documento" (resultante) na resposta da requisição.
   *
   * @param response
   * @param next
   */
  render(response: restify.Response, next: restify.Next) {
    return (document) => {
      if (document) {
        this.emit('beforeRender', document)
        response.json(document)
      } else {
        throw new NotFoundError('Documento não encontrado.')
      }
      return next()
    }
  }
}
