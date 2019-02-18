import { h } from 'preact';
import { InjectedComponent } from '@stores';
import { Panel } from '@components/Panel/Panel';
import { SiteForm } from '@components/SiteForm/SiteForm';
import { observer, inject } from 'mobx-preact';
import { SitesStore } from '@stores/sites';
import { Button } from '@components/Form/Button/Button';

interface InjectedProps {
  sites: SitesStore
}

@inject(['sites']) @observer
export class EditSitePanel extends InjectedComponent<{}, InjectedProps, {}> {
  showSite = () => {
    console.log(this.cprops.sites.editingSite, this.cprops.sites.editingSite!.selectedUser)
  }

  render () {
    let { sites } = this.cprops;

    return (
      <Panel>
        <Panel.Content>
          <SiteForm site={sites.editingSite} />
        </Panel.Content>
        <Panel.Footer>
          <Button color="black" wide={true} content="Save" onClick={this.showSite} />
        </Panel.Footer>
      </Panel>
    )
  }
}