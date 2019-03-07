import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            signUpError: '',
            signUpEmail: '',
            signUpPassword: '',
            signUpFullName: '',
            signUpTelephone: '',
        }
        this.onChangeSignUpEmail = this.onChangeSignUpEmail.bind(this);
        this.onChangeSignUpPassword = this.onChangeSignUpPassword.bind(this);
        this.onChangeSignUpTelephone = this.onChangeSignUpTelephone.bind(this);
        this.onChangeSignUpFullName = this.onChangeSignUpFullName.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
    }

    onChangeSignUpFullName(event){
        this.setState({
          signUpFullName: event.target.value
        });
    }

    onChangeSignUpTelephone(event){
        this.setState({
          signUpTelephone: event.target.value
        });
    }

    onChangeSignUpEmail(event){
        this.setState({
          signUpEmail: event.target.value
        });
    }

    onChangeSignUpPassword(event){
        this.setState({
          signUpPassword: event.target.value
        });
    }

    onSignUp(){
        const {signUpEmail, signUpPassword, signUpFullName, signUpTelephone} = this.state;

        this.setState({
            isLoading: true
        })

        fetch('/api/account/signup', {
            method: 'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            email: signUpEmail,
            password: signUpPassword,
            fullName: signUpFullName,
            telephone: signUpTelephone
            })
        }).then( res => res.json() )
            .then(json => {
            console.log('json:' + json);
            if(json.success){
                this.setState({
                signUpError: json.message,
                isLoading: false,
                signUpEmail: '',
                signUpPassword: ''
                });
            } else {
                this.setState({
                signUpError: json.message,
                isLoading: false
                })
            }
        })
    }

    render(){
        const {
                signInPassword, 
                signUpError,
                signUpFullName,
                signUpTelephone, 
                signUpEmail,
                signUpPassword
              } = this.state;
        return(
            <div id="signup-section">
                <section  className="container">
                    <div className="signup">
                        {
                        (signUpError) ? (
                            <p>{signUpError}</p>
                        ) : (null)
                        }
                        <h1>Sign Up</h1>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={signUpFullName}
                            onChange={this.onChangeSignUpFullName}/>
                        <br />
                        <input
                            type="text"
                            placeholder="Telephone"
                            value={signUpTelephone}
                            onChange={this.onChangeSignUpTelephone}/>
                        <br />
                        <input
                            type="text"
                            placeholder="Email"
                            value={signUpEmail}
                            onChange={this.onChangeSignUpEmail}/>
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={signUpPassword}
                            onChange={this.onChangeSignUpPassword}/>
                        <br />
                        <div className="signup-actions">
                            <Link to="/">Cancel</Link>
                            <input type="submit" onClick={this.onSignUp} value="Sign Up" />
                        </div>
                    </div>
                </section>
            </div>
            
        )
    }
}

export default SignUp;