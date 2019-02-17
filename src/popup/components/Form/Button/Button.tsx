import { h, Component } from 'preact';

import './Button.scss';

interface IProps extends JSX.HTMLAttributes {
  color?: string;
  wide?: boolean;
  content: string;
}

export class Button extends Component<IProps, {}> {
  render () {
    let { color, wide, content, ...rest } = this.props;

    let classes = [
      color ? `is-${color}` : '',
      wide ? `is-fullwidth` : '',
    ]

    

    return (
      <a className={`button ${classes.join(' ')}`} {...rest}>{content}</a>
    )
  }
}