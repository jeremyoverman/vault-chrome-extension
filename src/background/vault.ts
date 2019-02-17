import axios from 'axios';

export interface IVaultConfig {
  host: string;
  protocol: string;
  port: number;
  basePath: string;
}

export class Vault {
  constructor (public config: IVaultConfig) { }

  headers: { [name: string]: string} = {}

  get base() {
    let { protocol, host, port } = this.config;

    return `${protocol}://${host}:${port}/v1`
  }

  get siteData() {
    let { basePath } = this.config;

    return `${this.base}/secret/data/${basePath}`;
  }

  get siteMeta() {
    let { basePath } = this.config;

    return `${this.base}/secret/metadata/${basePath}`;
  }

  async loginWithToken (token: string) {
    const headers = {
      'X-Vault-Token': token
    };

    let response = await axios.get(`${this.base}/secret/config`, { headers });

    if (response.status === 200) {
      this.headers = headers

      return token;
    } else {
      throw new Error(`Received status ${response.status}`)
    }
  }

  async getChildren (root: string = '') {
    if (root && !root.startsWith('/')) {
      root = `/${root}`
    }

    try {
      let response = await axios.get(`${this.siteMeta}${root}?list=true`, { headers: this.headers })

      return response.data.data.keys;
    } catch (err) {
      throw new Error(`Error retreiving site list.`)
    }
  }

  async getSiteUser (site: string, user: string) {
    try {
      let response = await axios.get(`${this.siteData}/${site}/${user}`, { headers: this.headers })

      return response.data.data;
    } catch (err) {
      throw new Error(`Error retreiving user.`)
    }
  }
}