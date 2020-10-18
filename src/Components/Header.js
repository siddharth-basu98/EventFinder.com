import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser, removeUserSession } from "../Utils/Common";
import axios from "axios" ; 

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

  handleLoad = () => {
    axios
      .get(`http://localhost:4000/init`)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("There is some error in loading the initial data");
      });
  }

  render() {

    let a = getUser() ; 
    console.log(a) ; 


    return (
      <nav className="navbar navbar-expand-md navbar-inverse bg-dark display-5" style={{marginBottom:0}}>
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li className="nav-item" style={{ fontSize: 20, color:"white" }}>
              <Link to="/">FindMyEvents.com</Link>
            </li>

            <li className="nav-item" style={{ fontSize: 20 }}>
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item" style={{ fontSize: 20 }}>
              <Link to="/events">Events</Link>
            </li>


            {
              (a==null) ? (<li className="nav-item" style={{ fontSize: 20 }}>
              <Link to="/login">Login</Link>
             </li> ) : <li className="nav-item" style={{ fontSize: 20 }}>
              <Link to="/" onClick={this.handleLogout}>Logout</Link>
            </li> 
            }

            {(a!=null) ? (<li className="nav-item" style={{ fontSize: 20 }}>
            <Link>Hello {a.name}!</Link>
            </li>) : (<li></li>)}

            {
              (a==null) ? (<li className="nav-item" style={{ fontSize: 20 }}>
              <Link onClick={this.handleLoad}>Load initial data (For prototype demo purposes)</Link>
             </li> ) : (<span></span>)
            }

          </ul>
        </div>
      </nav>
    );
  }
}
