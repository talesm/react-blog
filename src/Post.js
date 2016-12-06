import React from 'react';

export default function(props){
  return (
    <div className="App-post w3-card-4 w3-margin">
      {props.children}
    </div>
  );
}
