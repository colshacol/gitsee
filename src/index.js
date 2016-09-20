import React, { Component } from 'react'
import ReactDOM	from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router'
import axios from 'axios'
import Tappable from 'react-tappable'

import './styles/reset.styl'
import './styles/grid.styl'
import './styles/index.styl'
import './styles/SERP.styl'
import './styles/Repo.styl'
import './styles/Home.styl'
import './styles/Add.styl'

import Home from './views/Home'
import SERP from './views/SERP'
import Repo from './comps/Repo'
import Add from './views/Add.js'

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
						<p className="logo"><Link to="/">GIT<span>SEE</span></Link></p>
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
		</Route>
	</Router>,
	document.getElementById('root')
)


// const childrenWithProps = React.Children.map(this.props.children,
//  (child) => React.cloneElement(child, {
// 	 logInSuccess: this.logInSuccess,
// 	 logOut: this.logOut,
// 	 loggedIn: this.state.loggedIn
//  })
// );
