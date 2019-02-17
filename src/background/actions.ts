import { Vault } from "./vault";
import { BrowserSession } from "@models/browsersession";

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

const vault = new Vault({
  host: 'localhost',
  port: 8200,
  basePath: 'sites',
  protocol: 'http'
})

export const login = new Action<string>('login', async (payload, cb) => {
  let token: string;

  try {
    token = await vault.loginWithToken(payload.token)
  } catch (err) {
    return cb({
      error: 'Invalid login.'
    })
  }

  if (token) {
    chrome.storage.local.set({
      session: {
        token
      }
    }, () => {
      if (cb) {
        return cb(token)
      }
    })
  }
})

export const logout = new Action('logout', async (_payload, cb) => {
  chrome.storage.local.remove('session', () => {
    cb()
  })
})

export const getSession = new Action<BrowserSession | null>('getSession', async (_payload, cb) => {
  chrome.storage.local.get('session', (result) => {
    if (result && result.session) {
      return cb(result.session as BrowserSession)
    } else {
      return cb()
    }
  });
})