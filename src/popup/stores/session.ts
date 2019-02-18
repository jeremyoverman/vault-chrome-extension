import { observable, action, runInAction, computed } from 'mobx';
import { login, getSession, logout } from '@actions/session';
import { stores } from '@stores';

export class SessionStore {
  @observable token: string = '';

  @computed get isLoggedIn () {
    return this.token.length > 0
  }

  @action login = async (token: string) => {
    try {
      let response = await login.invoke({ token })

      runInAction(() => {
        this.token = response
        stores.userInterface.goto('main')
      })
    } catch (err) {
      runInAction(() => {
        stores.userInterface.error = err
      })
    }
  }

  @action logout = async () => {
    await logout.invoke();

    runInAction(() => {
      this.token = ''
      stores.userInterface.goto('login')
    })
  }

  @action update = async () => {
    try {
      let session = await getSession.invoke()

      runInAction(() => {
        if (session) {
          this.token = session.token
        }
      })
    } catch (err) {
      runInAction(() => {
        stores.userInterface.error = err
      })
    }
  }
}