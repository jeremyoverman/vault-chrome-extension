import { h, Component } from 'preact';
import { ContextPopup } from '../ContextPopup/ContextPopup';

import './ContextIcon.scss';

interface IProps {
  bbox: ClientRect | DOMRect;
}

interface IState {
  isContextPopupOpen: Boolean;
}

export class ContextIcon extends Component<IProps, IState> {
  state: IState = {
    isContextPopupOpen: false
  }

  toggleContextPopup = () => this.setState({ isContextPopupOpen: !this.state.isContextPopupOpen })
  closeContextPopup = () => this.setState({ isContextPopupOpen: false })

  render () {
    const { bbox } = this.props;

    const iconSize = 16;

    const style = {
      width: `${iconSize}px`,
      height: `${iconSize}px`,
      top: bbox.top + Math.floor((bbox.height - iconSize) / 2),
      left: bbox.right - iconSize - 2,
    }

    return (
      <div>
        <div style={style} className="context-icon" onClick={this.toggleContextPopup}>
          <img src='./dist/icons/vault.png' width="16" height="16" />
        </div>
        <ContextPopup bbox={bbox} open={this.state.isContextPopupOpen} />
      </div>
    )
  }
}