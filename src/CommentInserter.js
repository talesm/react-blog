import React from 'react';

export default function(props) {
  const message = props.message;
  return(
    <div>
      <textarea className="w3-input" value={message.content}
        onChange={props.onEditContent}
        disabled={!props.user}
      />
      <button className={"w3-btn-block w3-theme" + (!message.content?" w3-disabled":"")}
          onClick={props.onSubmit}
      >Insert Comment</button>
    </div>
  );
}
