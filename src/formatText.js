import React from 'react';

export default function formatText(content) {
  return content.split("\n\n").map((s, i)=><p key={i}>{s}</p>);
}
