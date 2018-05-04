"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    { id: '1', name: 'Peter Parker', email: 'peter@marvel.com' },
    { id: '2', name: 'Bruce Wayne', email: 'bruce@dc.com' },
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
    /**
     * Retorna o usuário conforme o "id" informado.
     *
     * @param id
     */
    static findById(id) {
        return new Promise(resolve => {
            const filtered = users.filter(user => user.id === id);
            let user = undefined;
            if (filtered.length > 0) {
                user = filtered[0];
            }
            resolve(user);
        });
    }
}
exports.User = User;
//# sourceMappingURL=users.model.js.map