import { h } from 'preact';
import { observer, inject } from 'mobx-preact';

import { LoginPanel } from '@components/LoginPanel/LoginPanel';
import { SessionStore } from '@stores/session';
import { InjectedComponent } from '@stores';
import { MainPanel } from './MainPanel/MainPanel';
import { UserInterfaceStore } from '@stores/interface';
import { OptionsPanel } from './OptionsPanel/OptionsPanel';

interface IProps { }

interface IInjectedProps {
  session: SessionStore;
  userInterface: UserInterfaceStore;
}

@inject(['session'])
@inject(['userInterface'])
@observer
export class App extends InjectedComponent<IProps, IInjectedProps, {}> {
  render () {
    let { session, userInterface } = this.cprops;
    let panel;

    if (userInterface.isOptionsOpen) {
      panel = <OptionsPanel />
    } else if (session.token) {
      panel = <MainPanel />
    } else {
      panel = <LoginPanel />
    }

    return panel
  }
}