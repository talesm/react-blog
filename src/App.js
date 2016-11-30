import React from 'react';
import SignUpForm from './SignUpForm'
import Model from './model';
import './w3.css';
import './w3-theme-amber.css';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {userName: null }
    this.model = new Model();
    this.user = null;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="App">
        <div className="w3-container w3-theme App-header">
          <h2>Welcome Post System, {this.state.userName || 'Visitor'}</h2>
        </div>
        <button className="w3-btn w3-theme-l3 w3-right" onClick={this.logInOut}>
          { !this.state.userName ? "Log In": "Log Out"}
        </button>
        { !this.state.userName &&
          <SignUpForm onSubmit={this.handleSignUp} onError={alert}/>
        }
        <div className="w3-container w3-theme-dark App-footer">
          Created by <a target="__blank" href="https://talesm.github.io">talesm</a> for
          an employment test, do not reuse it without permission.
        </div>
      </div>
    );
  }

  handleSignUp = (userName, password) => {
    this.setState({userName: userName});
    this.user = this.model.createUser(userName, password);
  }
}

export default App;
