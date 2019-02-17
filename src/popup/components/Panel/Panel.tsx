import { h, Component } from 'preact';

import './Panel.scss';

import { InjectedComponent } from '@stores';
import { UserInterfaceStore } from '@stores/interface';
import { inject, observer } from 'mobx-preact';

interface PanelContentProps {
  padded?: Boolean;
}

export class PanelContent extends Component<PanelContentProps, {}> {
  render () {
    return <div className={`content ${this.props.padded !== false ? 'padded' : ''}`}>{this.props.children}</div>
  }
}

export class PanelFooter extends Component {
  render () {
    return <div className="footer">{this.props.children}</div>
  }
}

interface InjectedProps {
  userInterface: UserInterfaceStore;
}

@inject(['userInterface']) @observer
export class Panel extends InjectedComponent<{}, InjectedProps, {}> {
  static Content = PanelContent;
  static Footer = PanelFooter;

  render () {
    let { userInterface } = this.cprops;

    let error;

    if (userInterface.error) {
      error = (
        <article class="message is-danger">
          <div class="message-header">
            <p>{userInterface.error.message}</p>
            <button class="delete" aria-label="delete" onClick={userInterface.closeError}></button>
          </div>
        </article>
      )
    }

    return (
      <div className="popup">
        <div className="header">
          <div class="logo">
            <img src="./images/vault_logo.png"/>
          </div>
          <span className="icon settings" onClick={userInterface.toggleOptions}>
            <i class="fas fa-cog" />
          </span>
          {error}
        </div>
        {this.props.children}
      </div>
    )
  }
}