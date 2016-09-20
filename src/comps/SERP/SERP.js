import React, { Component } from 'react'
import Repo from '../Repo/Repo'
import './SERP.styl'

export default class SERP extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const repo = this.props.activeRepo;
    return (
      <div className="SERP view">
        {this.props.activeRepo}
      </div>
    )
  }
}
