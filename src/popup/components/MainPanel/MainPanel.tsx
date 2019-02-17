import { h } from 'preact';
import { InjectedComponent } from '@stores';
import { Panel } from '@components/Panel/Panel';

export class MainPanel extends InjectedComponent<{}, {}, {}> {
  render () {
    return (
      <Panel>
        <Panel.Content>
          <h1>Login success!</h1>
        </Panel.Content>
      </Panel>
    )
  }
}