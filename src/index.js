import React, { Component } from 'react'
import ReactDOM	from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router'
import axios from 'axios'
import Tappable from 'react-tappable'

import './styles/reset.styl'
import './index.styl'

import Home from './comps/Home/Home'
import SERP from './comps/SERP/SERP'
import Repo from './comps/Repo/Repo'
import Add from './comps/Add/Add'
import Login from './comps/Login/Login'
import Register from './comps/Register/Register'
import Dash from './comps/Dash/Dash'

import userStore from './stores/UserStore'

class AppWindow extends Component {
	constructor() {
		super()
		this.state = {
			activeRepo: <Repo />,
			searchPlaceholder: 'search repos',
			searchAlert: ''
		}

		this.fetchRepoByKeypress = (e) => {
			e.preventDefault()
			if (e.which === 13) {
				this.fetchRepoByClick()
			}
		}

		this.fetchRepoByClick = ( ) => {
			const searchBar = document.getElementById('search-bar')
			const input = searchBar.value.replace(/\s+/g, '')
			if (input.length < 3) { return }
			axios.get('/repos/' + input.toLowerCase())
				.then((res) => {

					const repo = res.data[0]

					this.setState({
						activeRepo: <Repo
													owner={repo.owner}
													reponame={repo.reponame}
													dateAdded={repo.dateAdded}
													history={repo.history}
												/>
					})

					browserHistory.push(`/SERP/${repo.owner}/${repo.reponame}`)
					// setTimeout(() => console.log(this.state.activeRepo), 1000)
				})

				.catch((err) => {
					this.setState({
						searchPlaceholder: 'Repo not found in our DB.',
						searchAlert: 'no-repo-found'
					})

					searchBar.value = 'Repo not found in our DB. Try adding it.';

					setTimeout(() => {
						searchBar.value = input;
						this.setState({
							searchAlert: ''
						})
					}, 1500)
				})
		}
	}

	goToHome = () => {
		if (userStore.loggedIn) {
			browserHistory.push('/dashboard')
		} else {
			browserHistory.push('/')
		}
	}

	render() {
		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {
				activeRepo: this.state.activeRepo,
			})
		)

		return (
			<div className="AppWindow view">
				<nav>
					<div>
						<p className="logo" onClick={this.goToHome}>GIT<span>SEE</span></p>
						<input onKeyUp={this.fetchRepoByKeypress} className={this.state.searchAlert} id="search-bar" placeholder={this.state.searchPlaceholder}/>
						<img onClick={this.fetchRepoByClick} src="images/search.svg" />
					</div>
				</nav>
				{childrenWithProps}
			</div>
		)
	}
}


ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={AppWindow}>
			<IndexRoute component={Home}></IndexRoute>
			<Route path="/SERP/:owner/:reponame" component={SERP}></Route>
			<Route path="/add" component={Add}></Route>
			<Route path="/login" component={Login}></Route>
			<Route path="/register" component={Register}></Route>
			<Route path="/dashboard" component={Dash}></Route>
		</Route>
	</Router>,
	document.getElementById('root')
)
