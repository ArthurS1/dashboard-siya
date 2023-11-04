/*
 * Mobile API abstraction.
 */

import axios from 'axios';

import Configuration from '../interfaces/Configuration';

export default class MobileApi {
  private _conf: Configuration;
  private _baseUrl: string;

  constructor(conf: Configuration) {
    this._conf = conf;
    this._baseUrl = this._conf
      .baseUrlFor('REACT_APP_MOBILE_API')
      .toString()
      .slice(0, -1);
  }

  async getAllSignals() {
    return this.formatError(
      axios.get(
        `${this._baseUrl}/events/getAll`
      )
    );
  }

  async updateUserAmbassadorLevel(id: string, newLevel: number) {
    return this.formatError(
      axios.patch(
        `${this._baseUrl}/users/update/${id}`,
        {
          data: {
            // eslint-disable-next-line camelcase
            amb_level: newLevel
          }
        }
      )
    );
  }

  async deleteUser(id: string) {
    return this.formatError(
      axios.delete(`${this._baseUrl}/users/${id}`)
    );
  }

  async getUser(id: string) {
    return this.formatError(
      axios.get(
        `${this._baseUrl}/users/fetch/${id}`
      )
    );
  }

  async getAllUsers() {
    return this.formatError(
      axios.get(
        `${this._baseUrl}/users/getAll`
      )
    );
  }

  private async formatError<T>(p: Promise<T>): Promise<T> {
    return p
      .catch((err) => (
        Promise.reject({
          title: 'Erreur',
          description: err.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      )
      );
  }

}

export function useMobileApi(conf: Configuration) {
  return new MobileApi(conf);
}
