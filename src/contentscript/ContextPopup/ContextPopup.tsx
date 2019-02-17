import { h, Component } from 'preact';

import './ContextPopup.scss';

interface IProps {
  bbox: ClientRect | DOMRect;
  open: Boolean;
}

export class ContextPopup extends Component<IProps, {}> {
  render () {
    const { open, bbox } = this.props;

    const style = {
      top: `${bbox.top + bbox.height + 5}px`,
      left: `${bbox.left}px`,
    }

    if (open) {
      return (
        <div style={style} className="context-popup">Test</div>
      )
    } else {
      return <div />
    }
  }
}