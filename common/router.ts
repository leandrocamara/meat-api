
import * as restify from 'restify'
import { EventEmitter } from 'events'
import { NotFoundError } from 'restify-errors'

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
   * Método responsável por encapsular os dados de hypermedia.
   *
   * @param document
   */
  envelope (document: any): any {
    return document
  }

  /**
   * Método genérico para renderizar o "documento" (resultante) na resposta da requisição.
   *
   * @param response
   * @param next
   */
  render (response: restify.Response, next: restify.Next) {
    return (document) => {
      if (document) {
        this.emit('beforeRender', document)
        response.json(this.envelope(document))
      } else {
        throw new NotFoundError('Documento não encontrado.')
      }
      return next()
    }
  }

  /**
   * Método genérico para renderizar a lista de "documentos" (resultante) na resposta da requisição.
   *
   * @param response
   * @param next
   */
  renderAll (response: restify.Response, next: restify.Next) {
    return (documents: any[]) => {
      if (documents) {
        documents.forEach((document, index, array) => {
          this.emit('beforeRender', document)
          array[index] = this.envelope(document)
        })
        response.json(documents)
      } else {
        response.json([])
      }
      return next()
    }
  }

}
