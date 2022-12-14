import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';

function App() {
  return (
    <div className="root">
      <Header pageName="The Movie Database" />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
