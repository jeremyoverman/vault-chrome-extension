import { h, Component } from 'preact';

import './Select.scss';

interface Option {
  display?: string;
  value: string;
}

interface Props extends JSX.HTMLAttributes {
  options: Option[];
  label: string;
  editable?: boolean;
  onCancel?: () => void
}

interface State {
  isEditing: boolean;
}

export class Select extends Component<Props, State> {
  inputEl!: HTMLInputElement;

  edit = () => this.setState({ isEditing: true })

  cancel = () => {
    this.setState({ isEditing: false }, () => {
      if (this.props.onCancel) {
        this.props.onCancel()
      }
    })
  }

  render () {
    let { options, label, editable, ...rest } = this.props;
    let { isEditing } = this.state;

    let input;

    if (isEditing) {
      input = (
        <div className="control input-control">
          <input ref={inputEl => this.inputEl = inputEl} className="input" value={this.props.value} onChange={this.props.onChange} />
        </div>
      )
    } else {
      input = (
        <div className="control select-control">
          <div className="select">
            <select {...rest}>
              {options.map(option => (
                <option value={option.value}>{option.display !== undefined ? option.display : option.value}</option>
              ))}
            </select>
          </div>
        </div>
      )
    }

    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="field has-addons">
          {input}
          <div className="control edit-control">
            { isEditing
              ? <div className="button" onClick={this.cancel}>Cancel</div>
              : <div className="button" onClick={this.edit}>Edit</div>
            }
          </div>
        </div>
      </div>
    )
  }
}