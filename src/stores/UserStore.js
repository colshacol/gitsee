import { observable } from 'mobx'

class UserStore {
  @observable loggedIn = false
  @observable userData = {}
  @observable userName = 'timmy'
}

const userStore = window.userStore = new UserStore

export default userStore
