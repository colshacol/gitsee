import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'
import './Login.styl'

import userStore from '../../stores/UserStore'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.attemptLogin = (e) => {
      e.preventDefault()

      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;

      axios.get(`/users/login/${username}/${password}`)
      .then((res) => {
        switch (res.data.status) {
          case 'success':
            userStore.loggedIn = true;
            userStore.userData = res.data.userData;
            browserHistory.push('/dashboard')
            break;
        }
      })
    }
  }

  componentWillMount() {
    if (userStore.loggedIn) {
      browserHistory.push('/dashboard')
    }
  }

  render() {
    console.log('<Login /> rendering.')
    return (
      <div className="Login view">
        <h2>Login</h2>
        <form>
          <input id="login-username" placeholder="username"/>
          <input id="login-password" placeholder="password" type="password"/>
          <p>Forgot password?</p>
          <button onClick={this.attemptLogin}>Go!</button>
        </form>
      </div>
    )
  }
}
