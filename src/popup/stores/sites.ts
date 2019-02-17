import { Site } from "@models/site";
import { observable, action, runInAction } from "mobx";
import { getAllSites } from "@actions/sites";

export class SitesStore {
  @observable sites: Site[] = [];

  @action getSites = async () => {
    let response = await getAllSites.invoke()

    runInAction(() => {
      this.sites = response.map(url => {
        return new Site(url)
      })
    })
  }

  @action showUsers = (site: Site) => {
    site.isUsersShowing = true
  }
}