"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const mongoose = require("mongoose");
const restify_errors_1 = require("restify-errors");
/**
 * Classe que realiza operações genéricas do modelo (<D>) especificado pela classe especializa.
 */
class ModelRouter extends router_1.Router {
    /**
     * Define o modelo a ser utilizado pelo métodos genéricos.
     *
     * @param model
     */
    constructor(model) {
        super();
        this.model = model;
        /**
         * Verifica se o "id" informado é válido.
         */
        this.validateId = (req, resp, next) => {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                next(new restify_errors_1.NotFoundError('Documento não encontrado.'));
            }
            else {
                next();
            }
        };
        /**
         * Retorna uma lista de documentos.
         */
        this.findAll = (req, resp, next) => {
            this.model.find()
                .then(this.renderAll(resp, next))
                .catch(next);
        };
        /**
         * Retorna o documento conforme o "id" informado.
         */
        this.findById = (req, resp, next) => {
            this.prepareOne(this.model.findById(req.params.id))
                .then(this.render(resp, next))
                .catch(next);
        };
        /**
         * Salva um documento.
         */
        this.save = (req, resp, next) => {
            let document = new this.model(req.body);
            document.save()
                .then(this.render(resp, next))
                .catch(next);
        };
        /**
         * Atualiza todos os dados de um documento.
         */
        this.replace = (req, resp, next) => {
            const options = { runValidators: true, overwrite: true };
            this.model.update({ _id: req.params.id }, req.body, options).exec().then(result => {
                if (result.n) {
                    return this.model.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                }
            }).then(this.render(resp, next)).catch(next);
        };
        /**
         * Atualizar os dados de um documento de forma parcial.
         */
        this.update = (req, resp, next) => {
            const options = { runValidators: true, new: true };
            this.model.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp, next))
                .catch(next);
        };
        /**
         * Remove um documento.
         */
        this.delete = (req, resp, next) => {
            this.model.remove({ _id: req.params.id }).exec().then((cmdResult) => {
                if (cmdResult.result.n) {
                    resp.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento não encontrado.');
                }
                return next();
            }).catch(next);
        };
    }
    /**
     * Prepara a consulta antes de realizar a operação no BD.
     *
     * @param query
     */
    prepareOne(query) {
        return query;
    }
}
exports.ModelRouter = ModelRouter;
//# sourceMappingURL=model-router.js.map