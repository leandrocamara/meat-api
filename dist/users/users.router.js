"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("./users.model");
const model_router_1 = require("../common/model-router");
/**
 * Rotas do recurso "User".
 */
class UsersRouter extends model_router_1.ModelRouter {
    /**
     * Método construtor.
     */
    constructor() {
        super(users_model_1.User);
        /**
         * Retorna todos os usuário filtrando por "e-mail".
         */
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                users_model_1.User.findByEmail(req.query.email)
                    .then(user => user ? [user] : [])
                    .then(this.renderAll(resp, next))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.on('beforeRender', document => {
            document.password = undefined;
            // delete document.password
        });
    }
    /**
     * Aplica as rotas do recurso "Users" ao Servidor.
     *
     * @param application
     */
    applyRoutes(application) {
        application.get({ path: '/users', version: '2.0.0' }, [this.findByEmail, this.findAll]);
        application.get({ path: '/users', version: '1.0.0' }, this.findAll);
        application.get('/users/:id', [this.validateId, this.findById]);
        application.post('/users', this.save);
        application.put('/users/:id', [this.validateId, this.replace]);
        application.patch('/users/:id', [this.validateId, this.update]);
        application.del('/users/:id', [this.validateId, this.delete]);
    }
}
exports.usersRouter = new UsersRouter();
//# sourceMappingURL=users.router.js.map