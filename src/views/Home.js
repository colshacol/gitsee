import React, { Component } from 'react';
import { Link } from 'react-router';

// import SearchBar from './SearchBar/SearchBar.js';
// import TagCloud from './TagCloud/TagCloud.js';
// import SearchResults from './SearchResults/SearchResults.js';

export default class Home extends Component {
	constructor(props) {
		super(props);
	};



	goToSearchBar = (e) => {
		const searchBar = document.getElementById('searchBar');
		searchBar.focus();
		searchBar.classList.add('look-at-me');
		setTimeout(() => searchBar.classList.remove('look-at-me'), 350);
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
							<button onClick={this.goToSearchBar}>Search Repos</button>
							<button><Link to="/add">Add a Repo</Link></button>
							<button>Contribute</button>
							<button>Follow Me</button>
						</div>
					</div>
				</header>
			</div>
		)
	}
}
