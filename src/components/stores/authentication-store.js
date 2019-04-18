import { observable, decorate, computed, action } from 'mobx'

class AuthStore {
  isLoggedIn = false

  toggleLoggedIn () {
    this.isLoggedIn = !this.isLoggedIn
  }
}

export default decorate(AuthStore, {
  isLoggedIn: observable
})
