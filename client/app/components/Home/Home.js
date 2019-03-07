import React, { Component } from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
    };

    this.onChangeSignInEmail = this.onChangeSignInEmail.bind(this);
    this.onChangeSignInPassword = this.onChangeSignInPassword.bind(this);

  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  onChangeSignInEmail(event){
    this.setState({
      signInEmail: event.target.value
    });
  }

  onChangeSignInPassword(event){
    this.setState({
      signInPassword: event.target.value
    });
  }

  render() {
    const{
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
    } = this.state;

    if(isLoading){
      return (<div><p>LOADING...</p></div>)
    }
    if(!token){
      return (
        <div id="login-section" >
          <section className="container">
            <div className="login">
              {
                (signInError) ? (<p>signInError</p>) : (null)
              }
              <h1>Sign In</h1>
              <input
                type="text"
                placeholder="Email"
                value={signInEmail}
                onChange={this.onChangeSignInEmail}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={this.onChangeSignInPassword}
              />
              <br/>
              <input type="submit" value="Login"/>
              <div className="login-help">
              <Link to="/signup">
                Create new account
              </Link>
            </div>
            </div>
          </section>
        </div>
        
      );
    }

    return (
      <div>
        <p>Signed in</p>
      </div>
    );
    
  }
}

export default Home;
