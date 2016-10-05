import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import './Home.styl'

import userStore from '../../stores/UserStore'

export default class Home extends Component {

	// Focus the #search-bar when the view loads.
	componentDidMount = () => document.getElementById('search-bar').focus()

	// When user clicks "search repos" button, focus on #search-bar and
	// alert user by state deiven styles. (Search bar pop/flash.)
	goToSearchBar = (e) => {
		const searchBar = document.getElementById('search-bar')
		searchBar.focus()
		searchBar.classList.add('look-at-me')
		setTimeout(() => searchBar.classList.remove('look-at-me'), 350)
	}

	goToLogin = () => {
		if (userStore.loggedIn) {
			browserHistory.push('/dashboard')
		} else {
			browserHistory.push('/login')
		}
	}

	render() {
		return (
			<div className="Home view">
				<header>
					<div>
						<h2>Time Travel.</h2>
						<p>
							GitSee allows you to see if your favorite
							open source technologies are thriving, idling or dying.
						</p>
						<div>
							<div className="button-holder">
								<button onClick={this.goToSearchBar}>
									<p>Search Repos</p>
								</button>
								<Link to="/add">
									<button>
										<p>Add a Repo</p>
									</button>
								</Link>
							</div>
							<div className="button-holder">
								<button onClick={this.goToLogin} disabled>
									<p>Login</p>
								</button>
								<button onClick={this.goToRegister} disabled>
									<p>Register</p>
								</button>
							</div>
							<div className="button-holder">
								<a href="https://github.com/colshacol/gitsee/tree/dev">
									<button>
										<p>Contribute</p>
									</button>
								</a>
								<a href="https://twitter.com/colshacol">
									<button>
										<p>Follow Me</p>
									</button>
								</a>
							</div>
						</div>
					</div>
				</header>
			</div>
		)
	}
}
