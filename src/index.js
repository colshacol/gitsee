import React, { Component } from 'react'
import ReactDOM	from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import './styles/base/reset.styl'
import './styles/index.styl'
import './styles/NavBar.styl'
import './styles/Header.styl'

import NavBar from './comps/NavBar'
import Home from './views/Home/Home'

class AppWindow extends Component {
	render() {
		return (
			<div className="AppWindow view">
				<NavBar />
				<footer>
					<h3>nusync</h3>
				</footer>
			</div>
		)
	}
}


ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={AppWindow}>
			<IndexRoute component={Home}></IndexRoute>
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
