import React from 'react';
import LogInForm from './LogInForm'
import SignUpForm from './SignUpForm'

export default class extends React.Component{
  constructor(props){
    super(props);
    this.state = {showLogIn : false };
  }

  render() {
    if (this.props.loggedIn) {
      return null;
    }
    return (
      <div>
        <ul className="w3-navbar">
          <li><a href="#" className={!this.state.showLogIn && "w3-theme-action"} onClick={()=> this.setState({showLogIn:false}) }>
            Sign Up
          </a></li>
          <li><a href="#" className={ this.state.showLogIn && "w3-theme-action"} onClick={()=> this.setState({showLogIn:true}) }>
            Log In
          </a></li>
        </ul>
        {this.state.showLogIn? (
          <LogInForm onSubmit={this.props.onLogIn} onError={this.props.onError}/>
        ):(
          <SignUpForm onSubmit={this.props.onSignUp} onError={this.props.onError}/>
        )}
      </div>
    );
  }
}

function LogOutButton(props){
  if(!props.enabled){
    return null;
  }
  return (
    <button className="w3-btn w3-right w3-theme-l3" onClick={props.onClick}>
    Log Out
    </button>
  );
}

export {  LogOutButton };
