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
            users_model_1.User.findAll().then(users => {
                resp.json(users);
                return next();
            });
        });
    }
}
exports.usersRouter = new UsersRouter();
//# sourceMappingURL=users.router.js.map