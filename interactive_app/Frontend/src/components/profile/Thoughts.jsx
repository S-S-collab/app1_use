import React from 'react';

export const Thought = ({ thought }) => {
  return (
    <li>
      <div>
        <span>@{thought.username}</span>
        <p>{thought.text}</p>
      </div>
    </li>
  );
}
