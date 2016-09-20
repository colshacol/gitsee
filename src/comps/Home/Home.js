import React, { Component } from 'react'
import { Link } from 'react-router'
import './Home.styl'

export default class Home extends Component {
	constructor(props) {
		super(props)
	}

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
								<button onClick={this.goToSearchBar}>Search Repos</button>
								<button><Link to="/add">Add a Repo</Link></button>
							</div>
							<div className="button-holder">
								<button><a href="https://github.com/colshacol/gitsee/tree/dev">Contribute</a></button>
								<button><a href="https://twitter.com/colshacol">Follow Me</a></button>
							</div>
						</div>
					</div>
				</header>
			</div>
		)
	}
}
