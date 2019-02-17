import axios from 'axios';

export interface IVaultConfig {
  host: string;
  protocol: string;
  port: number;
  basePath: string;
}

export class Vault {
  constructor (public config: IVaultConfig) { }

  get base() {
    let { protocol, host, port } = this.config;

    return `${protocol}://${host}:${port}/v1`
  }

  get sites() {
    let { basePath } = this.config;

    return `${this.base}/secret/data/${basePath}`;
  }

  async loginWithToken (token: string) {
    const headers = {
      'X-Vault-Token': token
    };

    let response = await axios.get(`${this.base}/secret/config`, { headers });

    if (response.status === 200) {
      axios.defaults = { headers }

      return token;
    } else {
      throw new Error(`Received status ${response.status}`)
    }
  }

  async getSites () {
    let response = await axios.get(`${this.sites}/testsite.com/jeremyoverman`)

    console.log(response)
  }

  async getSiteUser (site: string, user: string) {
    let response = await axios.get(`${this.sites}/${site}/${user}`)

    console.log(response)
  }
}