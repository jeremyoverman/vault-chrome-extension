import { observable, action, runInAction } from "mobx";
import { Site } from "./site";
import { getUser } from "@actions/sites";
import { stores } from "@stores";
import { copyToClipboard } from "@actions/clipboard";

export interface UserMetadata {
  password: string;
}

export class User {
  constructor (username: string, site: Site) {
    this.site = site;
    this.username = username;
  }

  @observable site: Site;
  @observable username: string = '';
  @observable password: string = '';
  @observable isSelected: boolean = false;

  @action deselect = () => {
    this.isSelected = false
  }

  @action select = async () => {
    try {
      let response = await getUser.invoke({
        url: this.site.url,
        username: this.username
      })

      runInAction(() => {
        this.site.deselectUsers()
        this.isSelected = true
        this.password = response.password;
      })
    } catch (err) {
      runInAction(() => {
        stores.userInterface.error = err;
      })
    }
  }

  @action copyUsername = () => {
    copyToClipboard.invoke(this.username)
  }

  @action copyPassword = () => {
    copyToClipboard.invoke(this.password)
  }
}