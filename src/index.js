import React, { Component } from 'react';
import ReactDOM	from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import axios from 'axios';
import Tappable from 'react-tappable';

import './styles/reset.styl';
import './styles/grid.styl';
import './styles/index.styl';
import './styles/SERP.styl';
import './styles/Repo.styl';

import Home from './views/Home';
import SERP from './views/SERP';

class AppWindow extends Component {
	constructor() {
		super();
		this.state = {
			activeRepo: {}
		};

		this.fetchRepo = (e) => {
			const input = document.querySelector('nav > div input').value;
			if (input.length < 3) { return }
			axios.get('http://127.0.0.1:1234/repos/' + input)
				.then((res) => {
					const repo = res.data[0];

					this.setState({
						activeRepo: repo
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
				blah: 'bloo'
			})
		);

		return (
			<div className="AppWindow view">
				<nav>
					<div>
						<p className="logo">GIT<span>SEE</span></p>
						<input placeholder="search repos"/>
						<img onClick={this.fetchRepo} src="./public/images/plus.svg" />
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

// <Route path="/login" component={Login}></Route>
// <Route path="/register" component={Register}></Route>
// <Route path="/account" component={Account}></Route>
// <Route path="/log-out" component={LogOut}></Route>
// <Route path="/about" component={About}></Route>
