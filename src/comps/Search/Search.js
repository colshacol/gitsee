import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

import axios from 'axios'

import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Repo from '../Repo/Repo'

import './Search.styl'


@observer export default class Search extends Component {
  @observable repoOwner = this.props.params.owner
  @observable repoName = this.props.params.repo
  @observable status = 'Searching for '
  @observable repoData = <Repo />

  renderRepoData = () => {
    const { owner, repo } = this.props.params
    // console.log('Request: ' + owner.toLowerCase() + '/' + repo.toLowerCase())
    axios.get(`/repos/${owner.toLowerCase()}/${repo.toLowerCase()}`)
			.then((res) => {
        if (!res.data[0]) {
          this.repoData = {status: 'No results.'}
          return;
        }
				const result = res.data[0]
        this.status = 'Found repo.'
        this.repoData = {
          owner: result.owner,
          repoName: result.reponame,
          dateAdded: result.dateAdded,
          history: result.history,
          description: result.description
        }
			})
			.catch((err) => {
        console.log(err);
				this.status = 'Repo not found in our databse.'
			})
  }

  componentWillMount() {
    this.renderRepoData()
  }

  componentDidUpdate() {
    if (this.props.params.owner !== this.repoOwner || this.props.params.repo !== this.repoName) {
      this.repoOwner = this.props.params.owner
      this.repoName = this.props.params.repo
      this.renderRepoData()
    }
  }

  render() {
    const content = (this.repo) ? this.repo : 'ananana'
    console.log(this.repoOwner, this.repoName);
    return (
      <div className="Search view">
        <Repo
          status={this.repoData.status}
          owner={this.repoData.owner}
          repoName={this.repoData.repoName}
          dateAdded={this.repoData.dateAdded}
          history={this.repoData.history}
          description={this.repoData.description}
        />
      </div>
    )
  }
}
