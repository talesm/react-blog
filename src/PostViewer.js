import React from 'react';
import formatText from './formatText'

export default function PostViewer(props){
  return <div>{formatText(props.message.content)}</div>;
}
