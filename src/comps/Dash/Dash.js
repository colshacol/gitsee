import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { observer } from 'mobx-react'
import axios from 'axios'
import './Dash.styl'

import userStore from '../../stores/UserStore'

@observer
export default class Dash extends Component {
  constructor(props) {
    super(props)
    this.changeIt = () => userStore.userData.password = 'haha';
  }

  componentWillMount() {
    if (!userStore.loggedIn) {
      browserHistory.push('/')
    }
  }

  render() {
    console.log('<Dash /> rendering.')
    return (
      <div className="Dash view">
        <p>{userStore.userData.password}</p>
        <button onClick={this.changeIt}>CLICK</button>
      </div>
    )
  }
}
