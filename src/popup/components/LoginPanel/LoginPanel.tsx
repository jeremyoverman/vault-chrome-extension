import { h } from 'preact';
import { inject, observer } from 'mobx-preact';

import { InjectedComponent } from '@stores';
import { Panel } from '@components/Panel/Panel';
import { Button } from '@components/Form/Button/Button';
import { FormInput } from '@components/Form/Input/FormInput';

import { SessionStore } from '@stores/session';

import './LoginPanel.scss';

interface IState {
  form: {
    token: string;
    [name: string]: string;
  }
}

interface InjectedProps {
  session: SessionStore;
}

@inject(['session']) @observer
export class LoginPanel extends InjectedComponent<{}, InjectedProps, IState> {
  public state: IState = {
    form: {
      token: ''
    }
  }

  login = () => this.cprops.session.login(this.state.form.token)

  updateForm = (evt: Event) => {
    let target = evt.target as HTMLInputElement

    if (!target) {
      return false;
    }
    
    return this.setState({
      form: {
        [target.name]: target.value,
      }
    } as any);
  }

  render () {

    return (
      <Panel>
        <Panel.Content>
          <FormInput label="Token" type="password" name="token" onChange={this.updateForm} value={this.state.form.token} />
        </Panel.Content>
        <Panel.Footer>
          <Button wide={true} color="black" content="Login" onClick={this.login} />
        </Panel.Footer>
      </Panel>
    )
  }
}