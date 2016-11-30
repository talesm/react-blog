import React from 'react';
import Model from './Model';
import Post from './Post'
import PostForm from './PostForm'
import SignUpForm from './SignUpForm'
import './w3.css';
import './w3-theme-amber.css';
import './App.css';

function PostPanel(props) {
  if(props.posts.length === 0){
    return (<div className="w3-card-4 w3-center w3-theme-light"><h2>No post yet</h2></div>)
  }
  return (
    <div>{props.posts.map(post => <Post key={post.id} post={post} />)}</div>
  )
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {userName: null, posts: [] }
    this.model = new Model();
    this.model.onPostChanged(this.handlerPostsChanged);
    this.user = null;
  }

  componentDidMount() {
    this.resetPosts();
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="App">
        <div className="w3-container w3-theme App-header">
          <button className="w3-btn w3-theme-l3 w3-right" onClick={this.logInOut}>
          { !this.state.userName ? "Log In": "Log Out"}
          </button>
          <h2>Welcome Post System, {this.state.userName || 'Visitor'}</h2>
        </div>
        { !this.state.userName ? (
          <SignUpForm onSubmit={this.handleSignUp} onError={alert}/>
        ):(
          <PostForm submitButtonText="Add New Post" onSubmit={this.insertPost}/>
        )}

        <PostPanel posts={this.state.posts} />
        <div className="w3-container w3-theme-dark App-footer">
          Created by <a target="__blank" href="https://talesm.github.io">talesm</a> for
          an employment test, do not reuse it without permission.
        </div>
      </div>
    );
  }

  resetPosts(){
    this.setState({posts: this.model.getPosts()});
  }

  insertPost = (post) => {
    const {title, content} = post;
    this.model.createPost(this.user, title, content);
  }
  handlerPostsChanged = (post) => {
    this.resetPosts();
  }

  handleSignUp = (userName, password) => {
    try {
      this.user = this.model.createUser(userName, password);
      this.setState({userName: userName});
    } catch (e) {
      alert(e);
    }
  }

  logInOut = () => {
    if(this.user){
      this.user = null;
      this.setState({userName: null});
    } else {
      this.setState({showLoginForm: true});
    }
  }
}

export default App;
