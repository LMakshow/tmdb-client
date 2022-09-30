import React from 'react';

export default class Heading extends React.Component<{ text: string }, unknown> {
  render() {
    return (
      <div className="heading header__container">
        <h2 className="navigation">{this.props.text}</h2>
      </div>
    );
  }
}
