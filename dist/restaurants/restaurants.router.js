"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurants_model_1 = require("./restaurants.model");
const model_router_1 = require("../common/model-router");
const restify_errors_1 = require("restify-errors");
/**
 * Rotas do recurso "Restaurant".
 */
class RestaurantsRouter extends model_router_1.ModelRouter {
    /**
     * Método construtor.
     */
    constructor() {
        super(restaurants_model_1.Restaurant);
        /**
         * Retorna o menu de um Restaurante.
         */
        this.findMenu = (req, resp, next) => {
            restaurants_model_1.Restaurant.findById(req.params.id, '+menu')
                .then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurante não encontrado.');
                }
                else {
                    resp.json(rest.menu);
                    next();
                }
            }).catch(next);
        };
        /**
         * Atualiza todos os dados do menu do Restaurante.
         */
        this.replaceMenu = (req, resp, next) => {
            restaurants_model_1.Restaurant.findById(req.params.id)
                .then(rest => {
                if (!rest) {
                    throw new restify_errors_1.NotFoundError('Restaurante não encontrado.');
                }
                else {
                    rest.menu = req.body; // ARRAY de MenuItem
                    return rest.save();
                }
            }).then(rest => {
                resp.json(rest.menu);
                return next();
            }).catch(next);
        };
    }
    /**
     * Aplica as rotas do recurso "Restaurants" ao Servidor.
     *
     * @param application
     */
    applyRoutes(application) {
        application.get('/restaurants', this.findAll);
        application.get('/restaurants/:id', [this.validateId, this.findById]);
        application.post('/restaurants', this.save);
        application.put('/restaurants/:id', [this.validateId, this.replace]);
        application.patch('/restaurants/:id', [this.validateId, this.update]);
        application.del('/restaurants/:id', [this.validateId, this.delete]);
        application.get('/restaurants/:id/menu', [this.validateId, this.findMenu]);
        application.put('/restaurants/:id/menu', [this.validateId, this.replaceMenu]);
    }
}
exports.restaurantsRouter = new RestaurantsRouter();
//# sourceMappingURL=restaurants.router.js.map