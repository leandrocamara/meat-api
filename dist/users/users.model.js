"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { name: 'Peter Parker', email: 'peter@marvel.com' },
    { name: 'Bruce Wayne', email: 'bruce@dc.com' },
];
/**
 * User model.
 */
class User {
    /**
     * Retorna todos os usuários.
     */
    static findAll() {
        return Promise.resolve(users);
    }
}
exports.User = User;
//# sourceMappingURL=users.model.js.map