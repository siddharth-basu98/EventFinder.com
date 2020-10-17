import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser, removeUserSession } from "../Utils/Common";

export default class Header extends Component {

  constructor(props){
    super(props) ; 
    this.state={
      isLoggedIn : false,
    }
  }

  handleLogout = () => {
    removeUserSession();

    const {history} = this.props

    if(history){
      this.props.Router.push('/');
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-inverse bg-dark display-5" style={{marginBottom:0}}>
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
              <Link to="/" onClick={this.handleLogout}>Logout</Link>
            </li> 
            <li className="nav-item" style={{ fontSize: 15 }}>
             <Link to="/login">Login</Link>
            </li> 
          </ul>
        </div>
      </nav>
    );
  }
}
