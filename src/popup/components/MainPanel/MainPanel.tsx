import { h } from 'preact';
import { InjectedComponent } from '@stores';
import { Panel } from '@components/Panel/Panel';
import { inject, observer } from 'mobx-preact';
import { SitesStore } from '@stores/sites';

import './MainPanel.scss';
import { SiteCard } from '@components/SiteCard/SiteCard';

interface InjectedProps {
  sites: SitesStore
}

@inject(['sites']) @observer
export class MainPanel extends InjectedComponent<{}, InjectedProps, {}> {
  componentDidMount = () => {
    this.cprops.sites.getSites()
  }

  render () {
    let { sites } = this.cprops;

    let siteList = sites.sites.map(site => {
      return <SiteCard site={site} />
    })

    return (
      <Panel>
        <Panel.Content padded={false}>
          {siteList}
        </Panel.Content>
      </Panel>
    )
  }
}