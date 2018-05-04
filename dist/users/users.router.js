"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
/**
 * Rotas do recurso "User".
 */
class UsersRouter extends router_1.Router {
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
            users_model_1.User.find().then(users => {
                resp.json(users);
                return next();
            });
        });
        /**
         * Retorna o usuário conforme o "id" informado.
         */
        application.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id).then(user => {
                if (user) {
                    resp.json(user);
                    return next();
                }
                resp.send(404);
                return next();
            });
        });
        /**
         * Salva um usuario.
         */
        application.post('/users', (req, resp, next) => {
            let user = new users_model_1.User(req.body);
            user.save().then(user => {
                user.password = undefined;
                resp.json(user);
                return next();
            });
        });
    }
}
exports.usersRouter = new UsersRouter();
//# sourceMappingURL=users.router.js.map