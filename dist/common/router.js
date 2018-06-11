"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const restify_errors_1 = require("restify-errors");
/**
 * Classe abstrata, herdada por todas as "Routers".
 */
class Router extends events_1.EventEmitter {
    /**
     * Método responsável por encapsular os dados de hypermedia.
     *
     * @param document
     */
    envelope(document) {
        return document;
    }
    /**
     * Método genérico para renderizar o "documento" (resultante) na resposta da requisição.
     *
     * @param response
     * @param next
     */
    render(response, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document);
                response.json(this.envelope(document));
            }
            else {
                throw new restify_errors_1.NotFoundError('Documento não encontrado.');
            }
            return next();
        };
    }
    /**
     * Método genérico para renderizar a lista de "documentos" (resultante) na resposta da requisição.
     *
     * @param response
     * @param next
     */
    renderAll(response, next) {
        return (documents) => {
            if (documents) {
                documents.forEach((document, index, array) => {
                    this.emit('beforeRender', document);
                    array[index] = this.envelope(document);
                });
                response.json(documents);
            }
            else {
                response.json([]);
            }
            return next();
        };
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map