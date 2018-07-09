import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import './App.css'
import LoginForm from './components/Login/LoginForm'
import Header from './components/Header'
import Home from './components/Home'
import FindPart from './components/Parts/FindPart';
import AddPart from './components/Parts/AddPart';
import EditPart from './components/Parts/EditPart';

const DisplayLinks = props => {
	if (props.loggedIn && props.isAdmin) {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/findpart" className="nav-link">
							Trouver une pièce
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/addpart" className="nav-link">
							Ajouter une pièce
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/editpart" className="nav-link">
							Modifier une pièce
						</Link>
					</li>
					<li>
						<Link to="#" className="nav-link" onClick={props._logout}>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
    )
  } else if (props.loggedIn && !props.isAdmin) {
    return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li>
						<Link to="#" className="nav-link" onClick={props._logout}>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
    )
	} else {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							login
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
      user: {
        local: {
          isAdmin: false
        }
      }
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: {
            local: {
              isAdmin: false
            }
          }
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: {
            local: {
              isAdmin: false
            }
          }
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		return (
			<div className="App">
				<h1>FDC Composites</h1>
				<Header user={this.state.user} />
				{/* LINKS to our different 'pages' */}
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} isAdmin={this.state.user.local.isAdmin}/>
				{/*  ROUTES */}
				{/* <Route exact path="/" component={Home} /> */}
				<Route exact path="/" render={() => <Home user={this.state.user} />} />
        <Route exact path="/findpart" render={() => <FindPart />} />
        <Route exact path="/addpart" render={() => <AddPart />} />
        <Route exact path="/editpart" render={() => <EditPart />} />
				<Route
					exact
					path="/login"
					render={() =>
						<LoginForm
							_login={this._login}
						/>}
				/>
			</div>
		)
	}
}

export default App
