import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import './Frame.styl'

import repoStore from '../../stores/RepoStore'
import userStore from '../../stores/UserStore'

@observer export default class Frame extends Component {
	@observable searchAlert = ''

	fetchRepo = (e) => {
    if (e.type === 'keyup' && e.which != 13) return
		const input = repoSearch.value.replace(/\s+/g, '').split('/')
    browserHistory.push(`/search/${input[0]}/${input[1]}`)
	}

	goToHome = () => {
		if (userStore.loggedIn) {
			browserHistory.push('/dashboard')
		} else {
			browserHistory.push('/')
		}
	}

	render() {
		return (
			<div className="Frame view">
				<nav>
					<div>
						<p
              className="logo clickable"
              onClick={this.goToHome}>
                GIT<span>SEE</span>
            </p>
						<input
              onKeyUp={this.fetchRepo}
              className={this.searchAlert}
              id="repoSearch"
              placeholder="search by user/repo"
            />
						<img
              onClick={this.fetchRepo}
              src="images/search.svg"
              className="clickable"
            />
					</div>
				</nav>
				{this.props.children}
			</div>
		)
	}
}
