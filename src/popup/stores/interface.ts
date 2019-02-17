import { observable, action } from "mobx";

export class UserInterfaceStore {
  @observable error: Error | null = null;
  @observable isOptionsOpen: boolean = false;

  @action closeError = () => {
    this.error = null;
  }

  @action openOptions = () => {
    this.isOptionsOpen = true
  }

  @action closeOptions = () => {
    this.isOptionsOpen = false
  }

  @action toggleOptions = () => {
    console.log(this)
    this.isOptionsOpen = !this.isOptionsOpen
  }
}

export const userInterfaceStore = new UserInterfaceStore();