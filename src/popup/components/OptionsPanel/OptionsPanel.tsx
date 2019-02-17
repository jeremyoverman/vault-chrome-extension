import { h } from 'preact';
import { InjectedComponent } from '@stores';
import { Panel } from '@components/Panel/Panel';
import { Button } from '@components/Form/Button/Button';
import { SessionStore } from '@stores/session';
import { inject, observer } from 'mobx-preact';

interface InjectedProps {
  session: SessionStore
}

@inject(['session']) @observer
export class OptionsPanel extends InjectedComponent<{}, InjectedProps, {}> {
  render() {
    let { session } = this.cprops;

    return (
      <Panel>
        <Panel.Content />
        <Panel.Footer>
          {session.isLoggedIn ? <Button wide={true} color="black" content="Logout" onClick={session.logout} /> : ''}
        </Panel.Footer>
      </Panel>
    )
  }
}