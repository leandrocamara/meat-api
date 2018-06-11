"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reviews_model_1 = require("./reviews.model");
const model_router_1 = require("../common/model-router");
/**
 * Rotas do recurso "Review".
 */
class ReviewsRouter extends model_router_1.ModelRouter {
    /**
     * Método construtor.
     */
    constructor() {
        super(reviews_model_1.Review);
    }
    /**
     * Método responsável por encapsular os dados de hypermedia do recurso Review.
     *
     * @param document
     */
    envelope(document) {
        let resource = super.envelope(document);
        let restId = document.restaurant._id ? document.restaurant._id : document.restaurant;
        resource._links.restaurant = `/restaurants/${restId}`;
        return resource;
    }
    /**
     * Prepara a consulta para trazer informações do usuário e do restaurante.
     *
     * @param query
     */
    prepareOne(query) {
        return query.populate('user', 'name').populate('restaurant', 'name');
    }
    /**
     * Retorna a Review com informações do usuário e do restaurante, conforme o "id" informado.
     */
    /*findById = (req, resp, next) => {
      this.model.findById(req.params.id)
        .populate('user', 'name')
        .populate('restaurant', 'name')
        .then(this.render(resp, next))
        .catch(next)
    }*/
    /**
     * Aplica as rotas do recurso "Reviews" ao Servidor.
     *
     * @param application
     */
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
    }
}
exports.reviewsRouter = new ReviewsRouter();
//# sourceMappingURL=reviews.router.js.map