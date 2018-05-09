"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
/**
 * Classe abstrata, herdada por todas as "Routers".
 */
class Router extends events_1.EventEmitter {
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
                response.json(document);
            }
            else {
                response.send(404);
            }
            return next();
        };
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map