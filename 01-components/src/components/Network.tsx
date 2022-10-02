import React from 'react';
import networkError from '../assets/svg/network-error.svg';

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

interface NetworkErrorProps {
  message: string;
}

export class NetworkError extends React.Component<NetworkErrorProps, unknown> {
  render() {
    return (
      <div className="network-error text-big">
        <div className="error-container">
          <img src={networkError} alt="X" />
          <div>Network error. Please try again later.</div>
        </div>
        <div className="text-sm">{this.props.message}</div>
      </div>
    );
  }
}
