import React from 'react';

export class Preloader extends React.Component {
  render() {
    return (
      <div className="wait-for-server text-big">
        Loading data{' '}
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
