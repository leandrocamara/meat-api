
import * as restify from 'restify'
import * as mongoose from 'mongoose'

import { Router } from '../common/router'
import { handleError } from './error.handler'
import { environment } from '../common/environment'
import { mergePatchBodyParser } from './merge-patch.parser'

/**
 * Classe do Servidor.
 *
 * @author Leandro Câmara
 */
export class Server {

  application: restify.Server

  /**
   * Inicializa a conexão com o banco de dados (MongoDB).
   */
  initializeDb(): mongoose.MongooseThenable {
    (<any> mongoose).Promise = global.Promise
    return mongoose.connect(environment.db.url, {
      useMongoClient: true
    })
  }

  /**
   * Inicializa o Servidor e as Rotas da aplicação.
   */
  initRoutes(routers: Router[]): Promise<any>{
    return new Promise((resolve, reject) => {
      try {

        // Cria o servidor Restify
        this.application = restify.createServer({
          name: 'meat-api',
          version: '1.0.0'
        })

        // Instala plugins que serão utilizada por todas as rotas.
        this.application.use(restify.plugins.queryParser())
        this.application.use(restify.plugins.bodyParser())
        this.application.use(mergePatchBodyParser)

        // Routes
        for (let router of routers) {
          router.applyRoutes(this.application)
        }

        // Define a porta em que o Servidor responderá às requisições.
        this.application.listen(environment.server.port, () => {
          resolve(this.application)
        })

        this.application.on('restifyError', handleError)

      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Retorna a instância do Servidor.
   */
  bootstrap(routers: Router[] = []): Promise<Server>{
    return this.initializeDb().then(() =>
           this.initRoutes(routers).then(() => this))
  }

}
