
import * as restify from 'restify'

/**
 * Classe abstrata, herdada por todas as "Routers".
 */
export abstract class Router {

  /**
   * Aplica as rotas ao Servidor (application).
   * 
   * @param application
   */
  abstract applyRoutes (application: restify.Server)
}
