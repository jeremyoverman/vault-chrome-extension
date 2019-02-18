import { Site } from "@models/site";
import { observable, action, runInAction, computed } from "mobx";
import { getAllSites } from "@actions/sites";

export class SitesStore {
  @observable sites: Site[] = [];

  @computed get editingSite () {
    return this.sites.find(site => site.isEditing)
  }

  @action getSites = async () => {
    let response = await getAllSites.invoke()

    runInAction(() => {
      this.sites = response.map(url => {
        if (url.endsWith('/')) {
          url = url.slice(0, url.length - 1)
        }

        return new Site(url)
      })
    })
  }
}