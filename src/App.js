import React from 'react';
import AuthPanel, {LogOutButton} from './AuthPanel'
import Model from './Model';
import PostForm from './PostForm'
import PostPanel from './PostPanel'
import './w3.css';
import './w3-theme-amber.css';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {userName: null, posts: [], showLogIn : false }
    this.model = new Model();
    this.model.onPostChanged(this.onPostsChanged);
    this.user = null;
  }

  componentDidMount() {
    this.resetPosts();
  }

  componentWillUnmount() {
  }

  render() {
    let topPanel;
    if(this.state.userName) {//Truthy if loged in, falsy otherwise
      topPanel = <PostForm submitButtonText="Add New Post" onSubmit={this.onInsertPost}/>;
    } else {
      topPanel = <AuthPanel onLogIn={this.onLogIn} onSignUp={this.onSignUp} onError={alert}/>;
    }
    return (
      <div className="App">
        <div className="w3-container w3-theme App-header">
          <LogOutButton enabled={!!this.state.userName} onClick={this.onLogout} />
          <h2>Welcome Post System, {this.state.userName || 'Visitor'}</h2>
        </div>

        { topPanel }

        <PostPanel posts={this.state.posts} user={this.state.userName}
          onEdit={this.onEditPost} onRemove={this.onRemovePost}
          onEditComment={this.onEditComment} onInsertComment={this.onInsertComment}
          onRemoveComment={this.onRemoveComment}
        />

        <div className="w3-container w3-theme-dark App-footer">
          Created by <a target="__blank" href="https://talesm.github.io">talesm</a> for
          an employment test.
        </div>
      </div>
    );
  }

  resetPosts(){
    this.setState({posts: this.model.getPosts()});
  }

  onInsertPost = () => {
    const post = {
      title: "A title",
      content: "A content"
    }
    this.model.createPost(this.user, post);
  }

  onEditPost = (post) => {
    this.model.editPost(this.user, post);
  }

  onRemovePost = (postId) => {
    this.model.removePost(this.user, postId);
  }

  onInsertComment = (postId, comment) => {
    this.model.createComment(this.user, postId, comment);
  }

  onEditComment = (postId, comment) => {
    this.model.editComment(this.user, postId, comment);
  }

  onRemoveComment = (postId, commentId) => {
    this.model.removeComment(this.user, postId, commentId);
  }

  onPostsChanged = (post) => {
    this.resetPosts();
  }

  onSignUp = (userName, password) => {
    try {
      this.user = this.model.createUser(userName, password);
      this.setState({userName: userName});
    } catch (e) {
      alert(e);
    }
  }

  onLogIn = (userName, password) => {
    try {
      this.user = this.model.authUser(userName, password);
      this.setState({userName: userName});
    } catch (e) {
      alert(e);
    }
  }

  onLogout = () => {
    this.user = null;
    this.setState({userName: null});
  }
}

export default App;
