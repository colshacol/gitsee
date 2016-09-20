import { autorun, observable } from 'mobx'

class UserStore {
  @observable loggedIn = false;
  @observable userData = {}
}

const userStore = window.userStore = new UserStore

export default userStore

autorun(() => {
  // console.log(userStore.loggedIn)
  // console.log(userStore.userData)
})
