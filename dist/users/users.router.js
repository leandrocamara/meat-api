"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const restify_errors_1 = require("restify-errors");
const users_model_1 = require("./users.model");
/**
 * Rotas do recurso "User".
 */
class UsersRouter extends router_1.Router {
    constructor() {
        super();
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
        /**
         * Retorna todos os usuários.
         */
        application.get('/users', (req, resp, next) => {
            users_model_1.User.find()
                .then(this.render(resp, next))
                .catch(next);
        });
        /**
         * Retorna o usuário conforme o "id" informado.
         */
        application.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id)
                .then(this.render(resp, next))
                .catch(next);
        });
        /**
         * Salva um usuario.
         */
        application.post('/users', (req, resp, next) => {
            let user = new users_model_1.User(req.body);
            user.save()
                .then(this.render(resp, next))
                .catch(next);
        });
        /**
         * Atualiza todos os dados de um usuário.
         */
        application.put('/users/:id', (req, resp, next) => {
            const options = { runValidators: true, overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options).exec().then(result => {
                if (result.n) {
                    return users_model_1.User.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                }
            }).then(this.render(resp, next)).catch(next);
        });
        /**
         * Atualizar os dados de um usuário de forma parcial.
         */
        application.patch('/users/:id', (req, resp, next) => {
            const options = { runValidators: true, new: true };
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp, next))
                .catch(next);
        });
        /**
         * Remove um usuário.
         */
        application.del('/users/:id', (req, resp, next) => {
            users_model_1.User.remove({ _id: req.params.id }).exec().then((cmdResult) => {
                if (cmdResult.result.n) {
                    resp.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                }
                return next();
            }).catch(next);
        });
    }
}
exports.usersRouter = new UsersRouter();
//# sourceMappingURL=users.router.js.map