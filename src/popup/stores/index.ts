import { SessionStore } from "./session";
import { Component } from "preact";
import { UserInterfaceStore } from "./interface";
import { SitesStore } from "./sites";

export const stores = {
  session: new SessionStore(),
  userInterface: new UserInterfaceStore(),
  sites: new SitesStore()
}

export type Stores = {
  [k in keyof typeof stores]: typeof stores[k]
}

export abstract class InjectedComponent<NeededProps = {}, InjectedProps = {}, Store = {}> extends Component<NeededProps, Store> {
  get cprops() {
    return this.props as (InjectedProps & NeededProps);
  }
}