import React from 'react';

export default function Heading(props: { text: string }) {
  return (
    <div className="heading header__container">
      <h2>{props.text}</h2>
    </div>
  );
}
