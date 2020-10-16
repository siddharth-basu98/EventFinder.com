import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { getUser, removeUserSession } from "../Utils/Common";

export default class Header extends Component {

  constructor(props){
    super(props) ; 
    this.state={
      isLoggedIn : false,
    }
  }

  toggleLogin = () => {
    this.setState({isLoggedIn: !this.state.isLoggedIn})
  }


  handleLogout = () => {
    removeUserSession();

    const {history} = this.props

    if(history){
      this.props.Router.push('/');
    }
  }

  render() {
    const linkToObject = {pathname: "/login", state: {toggleIsLoggedIn: this.toggleLogin.toString()}}
    console.log(this.state.isLoggedIn)
    return (
      <nav className="navbar navbar-expand-md navbar-inverse bg-dark display-5">
        <div className="container-fluid">
          <ul className=" nav navbar-nav mr-auto">
            <li className="nav-item" style={{ fontSize: 15 }}>
              <Link to="/">Application</Link>
            </li>

            <li className="nav-item" style={{ fontSize: 15 }}>
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item" style={{ fontSize: 15 }}>
              <Link to="/events">Events</Link>
            </li>
            <li className="nav-item" style={{ fontSize: 15 }}>
              <Link to="/login" onClick={this.handleLogout}>Logout</Link>
            </li> 
            <li className="nav-item" style={{ fontSize: 15 }}>
             <Link to={linkToObject}>Login</Link>
            </li> 
          </ul>
        </div>
      </nav>
    );
  }
}
