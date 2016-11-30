import React from 'react';

export default class SignUpForm extends React.Component{
  constructor(props){
    super(props)
    this.state ={};
  }

  render() {
    return (
      <div className="w3-card-4">
        <div className="w3-container w3-theme-action">
          <h2>Sign Up</h2>
        </div>
        <form id="signUp" className="w3-container w3-text-theme">
          <input id="signUpUser" className="w3-input" type="text" value={this.state.user || ""}
            onChange={(ev) => this.setState({user: ev.target.value})}/>
          <label htmlFor="signUpUser">User Name</label>
          <input id="signUpPass" className="w3-input" type="password" value={this.state.password || ""}
            onChange={(ev) => this.setState({password: ev.target.value})}/>
          <label htmlFor="signUpPass">Password</label>
          <input id="signUpPass2" className="w3-input" type="password" value={this.state.passConfirmation || ""}
            onChange={(ev) => this.setState({passConfirmation: ev.target.value})}/>
          <label htmlFor="signUpPass2">Repeat Password</label>
          <button className="w3-btn-block" onClick={this.submitHandler}>Submit</button>
        </form>
      </div>
    );
  }

  submitHandler = (ev) => {
    ev.preventDefault();
    const errorHandler = this.props.onError || (() => {});
    if (!this.state.user) {
      errorHandler("Name Should not be empty.")
    } else if(this.state.password !== this.state.passConfirmation) {
      errorHandler("Password mismatch.")
    } else {
      const handler = this.props.onSubmit || (() => {});
      handler(this.state.user, 'Teste')
    }
  }
};
