import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import axios from 'axios'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import './Frame.styl'

import repoStore from '../..//stores/RepoStore'
import userStore from '../..//stores/UserStore'

@observer export default class Frame extends Component {
	@observable searchAlert = ''

	fetchRepoByKeypress = (e) => {
		if (e.which === 13) {
			e.preventDefault()
			this.fetchRepoByClick()
		}
	}

	fetchRepoByClick = (e) => {
		const searchBar = document.getElementById('search-bar')
		let input = searchBar.value.replace(/\s+/g, '')
    input = input.split('/')
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
						<p className="logo clickable" onClick={this.goToHome}>GIT<span>SEE</span></p>
						<input onKeyUp={this.fetchRepoByKeypress} className={this.searchAlert} id="search-bar" placeholder="search by user/repo"/>
						<img onClick={this.fetchRepoByClick} src="images/search.svg" className="clickable"/>
					</div>
				</nav>
				{this.props.children}
			</div>
		)
	}
}
