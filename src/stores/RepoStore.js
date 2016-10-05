import { observable } from 'mobx'

class RepoStore {
  @observable x = 10
  @observable searchResult = {}
}

const repoStore = window.repoStore = new RepoStore

export default repoStore
