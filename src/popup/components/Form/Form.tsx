import { h, Component } from 'preact';
import { FormInput } from './Input/FormInput';
import { Button } from './Button/Button';
import { Select } from './Select/Select';

export class Form extends Component {
  static Input = FormInput;
  static Button = Button;
  static Select = Select;

  render () {
    return <form>{this.props.children}</form>
  }
}