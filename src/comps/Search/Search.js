import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Repo from '../Repo/Repo'

import './Search.styl'

@observer
export default class Search extends Component {
  @observable params = this.props.params
  @observable repoOwner = this.props.params.owner
  @observable repoName = this.props.params.repo
  @observable status = 'Searching for '
  @observable repoData = <Repo />
  @observable additionalRepos = []

  addAnotherRepo = (e) => {
    if (e.which !== 13) return

    const
		  input = addRepoInput.value.replace(/\s+/g, '').split('/'),
      [owner, repo] = [input[0].toLowerCase(), input[1].toLowerCase()]

    axios.get(`/repos/${owner}/${repo}`)
			.then(res => {
        const result = res.data[0]

        // FIX: Alters original repo chart. No bueno, hermano!
        if (!result) return this.repoData = { status: 'No results.' }

        this.additionalRepos.push(
          <Repo
            owner={result.owner}
            repoName={result.reponame}
            dateAdded={result.dateAdded}
            history={result.history}
            description={result.description}
            key={this.additionalRepos.length}
          />
        )
			})
			.catch((err) => this.status = 'Repo not found in our databse.')
  }

  renderRepoData = () => {
    const { owner, repo } = this.props.params

    axios.get(`/repos/${owner.toLowerCase()}/${repo.toLowerCase()}`)
			.then(res => {
        const result = res.data[0]

        if (!result) return this.repoData = {status: 'No results.'}

        this.status = 'Found repo.'
        this.repoData = {
          owner: result.owner,
          repoName: result.reponame,
          dateAdded: result.dateAdded,
          history: result.history,
          description: result.description
        }
			})
			.catch(err => this.status = 'Repo not found in our databse.')
  }

  componentWillMount() {
    this.renderRepoData()
  }

  componentDidUpdate() {
    const
      ownerChanged = this.props.params.owner !== this.repoOwner,
      repoChanged = this.props.params.repo !== this.repoName

    if (ownerChanged || repoChanged) {
      this.repoOwner = this.props.params.owner
      this.repoName = this.props.params.repo
      this.renderRepoData()
    }
  }

  render() {
    return (
      <div className="search view">
        <Repo
          status={this.repoData.status}
          owner={this.repoData.owner}
          repoName={this.repoData.repoName}
          dateAdded={this.repoData.dateAdded}
          history={this.repoData.history}
          description={this.repoData.description}
        />
        {this.additionalRepos}
        <input
          id="addRepoInput"
          onKeyPress={this.addAnotherRepo}
          placeholder="add user/repo"
          name="add repo"
        />
      </div>
    )
  }
}
