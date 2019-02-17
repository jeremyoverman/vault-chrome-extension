import { Action, vault } from "@actions";
import { UserMetadata } from "@models/user";

export const getAllSites = new Action<string[]>('getAllSites', async (_payload, cb) => {
  try {
    let response = await vault.getChildren();

    return cb(response)
  } catch (err) {
    return cb({
      error: err.message
    })
  }
})

export const getUsers = new Action<string[]>('getUsers', async (site: string, cb) => {
  try {
    let response = await vault.getChildren(site);

    return cb(response)
  } catch (err) {
    return cb({
      error: err.message
    })
  }
})

export const getUser = new Action<UserMetadata>('getUser', async (payload, cb) => {
  try {
    let response = await vault.getSiteUser(payload.url, payload.username);

    return cb(response.data)
  } catch (err) {
    return cb({
      error: err.message
    })
  }
})