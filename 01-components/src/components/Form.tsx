import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default class FormPage extends React.Component {
  render() {
    return (
      <div className="root">
        <Header pageName="Form" />
        <div>Form will be here</div>
        <Footer />
      </div>
    );
  }
}
