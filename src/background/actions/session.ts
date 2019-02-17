import { BrowserSession } from "@models/browsersession";
import { Action, vault } from "@actions";

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