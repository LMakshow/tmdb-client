import { CameraData } from 'data';
import React from 'react';

export default class ShopCard extends React.Component<CameraData, { cart: boolean }> {
  constructor(props: CameraData) {
    super(props);
    this.state = { cart: false };
  }

  render() {
    return (
      <div className="shop-card-template">
        <div className="shop-card">
          <img
            className="shop-card__image"
            src={`${process.env.PUBLIC_URL}/cameras/${this.props.img}.jpg`}
            alt="Photo"
          />
          <h2 className="shop-card__name">{this.props.name}</h2>

          <div className="shop-card__price-mpix">
            <div className="shop-card__block">
              <h3 className="shop-card__price text-big">{this.props.price}</h3>
              <span className="text-aux">UAH</span>
            </div>
            <div className="shop-card__block">
              <p className="shop-card__mpix text-big">{this.props.mpix}</p>
              <span className="text-aux">MPix</span>
            </div>
          </div>

          <div className="shop-card__type-stab">
            <div className="shop-card__block">
              <p className="text-aux">type:</p>
              <span className="shop-card__type">{this.props.type}</span>
            </div>
            <div className="shop-card__block">
              <p className="text-aux">stabilization:</p>
              <span className="shop-card__stab">{this.props.stabilization}</span>
            </div>
          </div>

          <div className="shop-card__stock-cart">
            <p
              className={`shop-card__stock ${
                this.props.stock ? 'text-in-stock' : 'text-out-of-stock'
              }`}
            >
              {this.props.stock ? 'In Stock' : 'On Request'}
            </p>
            <button
              className={`shop-card__cart ${this.state.cart ? 'added' : ''}`}
              onClick={() => this.setState({ cart: !this.state.cart })}
            >
              {this.state.cart ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
