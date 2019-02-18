import { h } from 'preact';
import { InjectedComponent } from '@stores';
import { Site } from '@models/site';
import { observer } from 'mobx-preact';
import { UserList } from '@components/UserList/UserList';

import './SiteCard.scss';

interface Props {
  site: Site
}

@observer
export class SiteCard extends InjectedComponent<Props> {
  render () {
    let { site } = this.cprops;

    let content;

    if (site.isUsersShowing) {
      content = (
        <div>
          <div className="card-content is-paddingless">
            {site.isUsersShowing ? <UserList users={site.users} /> : ''}
          </div>
            {site.selectedUser ? (
              <footer class="card-footer">
                <a href="#" class="card-footer-item" onClick={site.selectedUser.copyUsername}>User</a>
                <a href="#" class="card-footer-item" onClick={site.selectedUser.copyPassword}>Password</a>
                <a href="#" class="card-footer-item" onClick={site.edit}>Edit</a>
              </footer>
            ) : ''}
        </div>
      )
    }

    return (
      <div className="card site-card">
        <header className="card-header" onClick={site.toggleUsers}>
          <p className="card-header-title">{site.url}</p>
          {site.isUsersShowing ? (
            <a href="#" class="card-header-icon">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          ) : ''}
        </header>
        {content}
      </div>
    )
  }
}