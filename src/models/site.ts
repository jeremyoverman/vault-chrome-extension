import { action, observable, runInAction, computed } from "mobx";
import { getUsers } from "@actions/sites";
import { stores } from "@stores";
import { User } from "./user";

export class Site {
  constructor (public url: string) { }

  @observable users: User[] = []

  @computed get selectedUser () {
    let user = this.users.find(user => user.isSelected)

    if (!user && this.users.length) {
      this.users[0].select()
      user = this.users[0]
    }

    return user;
  }

  @observable isUsersShowing: boolean = false
  @observable isEditing: boolean = false

  @action edit = () => {
    this.isEditing = true
    stores.userInterface.goto('edit_site')
  }

  @action deselectUsers = () => {
    this.users.forEach(user => user.deselect())
  }

  @action toggleUsers = async () => {
    if (this.isUsersShowing) {
      this.isUsersShowing = false
    } else {
      try {
        let usernames = await getUsers.invoke(this.url)

        runInAction(() => {
          this.users = usernames.map(username => new User(username, this))
          this.isUsersShowing = !this.isUsersShowing;
        })
      } catch (err) {
        runInAction(() => {
          stores.userInterface.error = err
        })
      }
    }
  }
}