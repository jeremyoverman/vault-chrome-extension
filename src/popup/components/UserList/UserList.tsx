import { h } from 'preact';
import { InjectedComponent } from '@stores';
import { observer } from 'mobx-preact';

import './UserList.scss';
import { User } from '@models/user';

interface Props {
  users: User[];
}

@observer
export class UserList extends InjectedComponent<Props> {
  render () {
    let userList = this.cprops.users.map(user => {
      return (
        <div className={`card ${user.isSelected ? 'selected' : ''}`}>
          <div className="header" onClick={user.select}>
            <div className="card-header-title">
              {user.username}
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="user-list">
        {userList}
      </div>
    )
  }
}