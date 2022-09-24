import React from 'react';
import Search from './Search';
import ShopCard from './ShopCard';
import data from 'data';

export default class Main extends React.Component {
  cards = data.map((item) => {
    return <ShopCard key={item.num} {...item} />;
  });

  render() {
    return (
      <div>
        <Search />
        <div className="shop-page">{this.cards}</div>
      </div>
    );
  }
}
