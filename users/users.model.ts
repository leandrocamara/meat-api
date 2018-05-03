
const users = [
  { name: 'Peter Parker', email: 'peter@marvel.com' },
  { name: 'Bruce Wayne', email: 'bruce@dc.com' },
]

/**
 * User model.
 */
export class User {

  /**
   * Retorna todos os usuários.
   */
  static findAll(): Promise<any[]> {
    return Promise.resolve(users)
  }

}
