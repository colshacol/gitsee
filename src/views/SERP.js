import React, { Component } from 'react'
import Repo from '../comps/Repo'

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
