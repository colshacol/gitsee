import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import axios from 'axios'
import './($NAME).($CSS)'

import userStore from '../../stores/UserStore'
import repoStore from './stores/RepoStore'


@observer export default class ($NAME) extends Component {
  @observable value = 0

  componentWillMount() {}
  componentDidMount() {}

  render() {
    return (
      <div className="($NAME) view">
        <div className="">

        </div>
      </div>
    )
  }
}
