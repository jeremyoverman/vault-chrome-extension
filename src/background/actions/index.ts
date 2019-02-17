import { Vault } from "../vault";

interface ErrorResponse {
  error: string
}

type Handler<R> = (payload: any, cb: (response?: R | ErrorResponse) => void) => void;

export function isError<R> (res: ErrorResponse | R): res is ErrorResponse {
  return res.hasOwnProperty('error')
}

export class Action<R> {
  constructor (public name: string, handler: Handler<R>) {
    chrome.runtime.onMessage.addListener((msg, _sender, res) => {
      if (msg.action === name) {
        handler(msg.payload, res);
      }

      return true;
    })
  }

  async invoke (payload?: any) {
    return new Promise<R>((resolve, reject) => {
      chrome.runtime.sendMessage({ action: this.name, payload }, (res) => {
        if (res && res.hasOwnProperty('error')) {
          reject(new Error(res.error))
        } else {
          resolve(res)
        }
      })
    })
  }
}

export const vault = new Vault({
  host: 'localhost',
  port: 8200,
  basePath: 'sites',
  protocol: 'http'
})

chrome.storage.local.get('session', (res) => {
  if (res && res.session && res.session.token) {
    vault.loginWithToken(res.session.token)
  }
})

import './session';
import './sites';
import './clipboard';