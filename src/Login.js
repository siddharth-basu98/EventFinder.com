import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import Header from './Components/Header';
import img_src from "./Images/avatar.svg";

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      error: "", 
    }
  }

  setError = (val) => this.setState({error: val})
  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]:value,
      error:""
    })
  }

  handleLogin = (event) => {

    event.preventDefault();

    axios.post('http://localhost:4000/users/signin', { username: this.state.username, password: this.state.password }).then(response => {
      setUserSession(response.data.token, response.data.user);
      this.props.history.push('/events');
    }).catch(error => {
      if (error.response.status === 401) this.setError(error.response.data.message);
      else this.setError("Something went wrong. Please try again later.");
    });
  }


  render() {

    console.log(this.state) ; 

    return (
<div className="container-fluid">
  <Header />
      <div className="container" id="sign_body">
    <form class="form-signin">
      <img class="center-image" src={img_src} alt="" />
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label htmlFor="inputUsername" class="sr-only">Username</label>
      <input type="text" name="username" onChange={this.handleChange} value={this.state.username} autoComplete="new-password"
      id="inputEmail" class="form-control" placeholder="Username" required autofocus />
      <br />
      <label htmlFor="inputPassword" class="sr-only">Password</label>

      <input type="password" name="password" onChange= {this.handleChange} value={this.state.password} autoComplete="new-password" 
      id="inputPassword" class="form-control" placeholder="Password" required />


          {this.state.error && (
              <p className="error lead text-danger">{this.state.error}</p>
            )}


     
      <button class="btn btn-lg btn-primary btn-block" type="submit" style={{padding:10}}
      value="Login" onClick={this.handleLogin}>
        <h3>Sign in</h3>
        </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
    </form>
      </div>
      </div>
    )
  }
}

export default Login;

