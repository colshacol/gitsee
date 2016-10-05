import React, { Component } from 'react'
import ReactDOM	from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router'
import axios from 'axios'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import './styles/reset.styl'

import Frame from './comps/Frame/Frame'
import Home from './comps/Home/Home'
import Search from './comps/Search/Search'
import Repo from './comps/Repo/Repo'
import Add from './comps/Add/Add'
import Login from './comps/Login/Login'
import Register from './comps/Register/Register'
import Dash from './comps/Dash/Dash'


ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Frame}>
			<IndexRoute component={Home}></IndexRoute>
			<Route path="/search" component={Search}></Route>
			<Route path="/search/:owner" component={Search}></Route>
			<Route path="/search/:owner/:repo" component={Search}></Route>
			<Route path="/add" component={Add}></Route>
			<Route path="/login" component={Login}></Route>
			<Route path="/register" component={Register}></Route>
			<Route path="/dashboard" component={Dash}></Route>
		</Route>
	</Router>,
	document.getElementById('root')
)
