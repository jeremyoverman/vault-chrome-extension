import { observable, action } from "mobx";

export class UserInterfaceStore {
  last_panel: string = 'main';

  @observable error: Error | null = null;
  @observable panel: string = 'main';

  @action goto = (panel: string) => {
    this.last_panel = `${this.panel}`;
    this.panel = panel;
  }

  @action closeError = () => {
    this.error = null;
  }

  @action back = () => {
    this.goto(this.last_panel)
  }

  @action toggleOptions = () => {
    if (this.panel === 'options') {
      this.back()
    } else {
      this.goto('options')
    }
  }
}

export const userInterfaceStore = new UserInterfaceStore();