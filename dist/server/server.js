"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
/**
 * Classe do Servidor.
 *
 * @author Leandro Câmara
 */
class Server {
    /**
     * Inicializa a conexão com o banco de dados (MongoDB).
     */
    initializeDb() {
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    /**
     * Inicializa o Servidor e as Rotas da aplicação.
     */
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                // Cria o servidor Restify
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });
                // Instala plugins que serão utilizada por todas as rotas.
                this.application.use(restify.plugins.queryParser());
                // Routes
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                // Define a porta em que o Servidor responderá às requisições.
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * Retorna a instância do Servidor.
     */
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map