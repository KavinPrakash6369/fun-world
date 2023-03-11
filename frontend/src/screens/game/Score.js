import React from 'react';

export default function Score(props) {
  {
    console.log(props.val);
  }
  return (
    <div className="headerTitle timer">
      {' '}
      <i class="fa-solid fa-timer"> Score: {props.val} </i>{' '}
    </div>
  );
}
