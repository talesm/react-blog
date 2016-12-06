import React from 'react';
import formatText from './formatText'
import PostContent from './PostContent'

export default function(props){
  return <PostContent
    {...props.message}
    content={formatText(props.message.content)}
  />
}
