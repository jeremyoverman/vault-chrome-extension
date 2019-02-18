import { h } from 'preact';
import { InjectedComponent } from '@stores';
import { Site } from '@models/site';
import { Form } from '@components/Form/Form';
import { observer } from 'mobx-preact';

interface Props {
  site?: Site
}

interface State {
  originalUsername: string;
}

@observer
export class SiteForm extends InjectedComponent<Props, {}, State> {
  site: Site;

  constructor (props: Props) {
    super(props)

    if (props.site) {
      this.site = props.site
    } else {
      this.site = new Site('')
    }

    this.state = {
      originalUsername: this.site.selectedUser ? this.site.selectedUser.username: ''
    }
  }

  onUserChange = (evt: Event) => {
    let target = evt.target as HTMLSelectElement | HTMLInputElement;

    let user = this.site.users.find(user => user.username === target.value)

    console.log(target.value)

    if (user) {
      user.select()
      this.setState({ originalUsername: user.username })
    } else {
      if (this.site.selectedUser) {
        this.site.selectedUser.username = target.value
      }
    }
  }

  onUserChangeCancel = () => {
    if (this.site.selectedUser) {
      this.site.selectedUser.username = this.state.originalUsername;
      this.site.selectedUser.select()
    }
  }

  render () {
    let userOptions = this.site.users.map(user => ({ value: user.username }));

    return (
      <Form>
        <Form.Input label="Site" value={this.site.url} />
        <Form.Select
          label="Username"
          editable={true}
          options={userOptions}
          value={this.site.selectedUser!.username}
          onChange={this.onUserChange}
          onCancel={this.onUserChangeCancel} />
      </Form>
    )
  }
}