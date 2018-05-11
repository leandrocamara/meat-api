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
        application.get('/reviews', this.findAll);
        application.get('/reviews/:id', [this.validateId, this.findById]);
        application.post('/reviews', this.save);
    }
}
exports.reviewsRouter = new ReviewsRouter();
//# sourceMappingURL=reviews.router.js.map