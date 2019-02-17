import { h, Component } from 'preact';

import './FormInput.scss';

interface IProps extends JSX.HTMLAttributes {
  label: string;
}

export class FormInput extends Component<IProps, {}> {
  render () {
    let { label, ...rest } = this.props;

    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <input className="input" {...rest} />
        </div>
      </div>
    )
  }
}