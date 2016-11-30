import React from 'react';

export default function (props) {
  const post = props.post;
  const buttons = (props.user === post.user) && (
    <div className="w3-btn-group w3-right">
      <button className="w3-btn">Edit</button>
      <button className="w3-btn">Remove</button>
    </div>
  );
  return (
    <div className="App-post w3-card-4 w3-margin">
      {buttons}
      <div className="w3-container w3-theme">
        <h3>{post.title}</h3>
      </div>
      <div className="w3-container w3-theme-l3">
      <span>Created By {post.user} on {post.created.toLocaleString()}</span>
      {post.modified && post.modified !== post.created && (
        <span>Modified on {post.modified.toLocaleString()}</span>
      )}
      </div>
      <div className="w3-container w3-theme-light">{post.content}</div>
    </div>
  );
}
