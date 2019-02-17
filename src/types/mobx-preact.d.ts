declare module 'mobx-preact' {
  export function observer(constructor: Function): any
  export function inject<C extends preact.Component>(stores: string[]): (c: new () => C) => any;

  export type InjectedComponent<InjectedProps, NeededProps, Store> = preact.Component<NeededProps, Store>

  export interface Stores {
    [store: string]: any;
  }

  export abstract class Provider extends preact.Component<any, any> {}
}