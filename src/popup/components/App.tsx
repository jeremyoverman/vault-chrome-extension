import { h } from 'preact';
import { observer, inject } from 'mobx-preact';

import { LoginPanel } from '@components/LoginPanel/LoginPanel';
import { SessionStore } from '@stores/session';
import { InjectedComponent } from '@stores';
import { MainPanel } from './MainPanel/MainPanel';
import { UserInterfaceStore } from '@stores/interface';
import { OptionsPanel } from './OptionsPanel/OptionsPanel';
import { EditSitePanel } from './EditSitePanel/EditSitePanel';

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

    if (!session.token && userInterface.panel !== 'options') {
      userInterface.goto('login')
    }

    if (userInterface.panel === 'options') {
      panel = <OptionsPanel />
    } else if (userInterface.panel === 'main') {
      panel = <MainPanel />
    } else if (userInterface.panel === 'edit_site') {
      panel = <EditSitePanel />
    } else {
      panel = <LoginPanel />
    }

    return panel
  }
}