import React from 'react';

export default function(props) {
  if(props.disabled){
    return null;
  }
  return (
    <div className="w3-btn-group w3-right">
      <button className="w3-btn w3-padding-tiny" onClick={props.onEdit}>Edit</button>
      <button className="w3-btn w3-padding-tiny" onClick={props.onRemove}>Remove</button>
    </div>
  );
}
