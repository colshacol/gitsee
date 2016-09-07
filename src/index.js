import React, { Component } from 'react';
import ReactDOM	from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import axios from 'axios';
import Tappable from 'react-tappable';

import './styles/reset.styl';
import './styles/grid.styl';
import './styles/index.styl';
import './styles/SERP.styl';
import './styles/Repo.styl';
import './styles/Home.styl';
import './styles/Add.styl';

import Home from './views/Home';
import SERP from './views/SERP';
import Repo from './comps/Repo';
import Add from './views/Add.js';

class AppWindow extends Component {
	constructor() {
		super();
		this.state = {
			activeRepo: <Repo />
		};

		this.fetchRepo = (e) => {
			const input = document.querySelector('nav > div input').value;
			if (input.length < 3) { return }
			axios.get('http://127.0.0.1:1234/repos/' + input)
				.then((res) => {
					const repo = res.data[0];

					this.setState({
						activeRepo: <Repo
													owner={repo.owner}
													reponame={repo.reponame}
													dateAdded={repo.dateAdded}
													history={repo.history}
												/>
					});

					browserHistory.push('/SERP')
					// setTimeout(() => console.log(this.state.activeRepo), 1000)
				})

				.catch((err) => {
					console.log('err!');
					console.log(err);
				})
		};
	};

	render() {
		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {
				activeRepo: this.state.activeRepo,
			})
		);

		return (
			<div className="AppWindow view">
				<nav>
					<div>
						<p className="logo"><Link to="/">GIT<span>SEE</span></Link></p>
						<input id="search-bar" placeholder="search repos"/>
						<img onClick={this.fetchRepo} src="images/search.svg" />
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
			<Route path="/SERP" component={SERP}></Route>
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
