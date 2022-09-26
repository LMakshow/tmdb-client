import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default class FormPage extends React.Component {
  render() {
    return (
      <div className="root">
        <Header pageName="Used Cameras: Browse And Add Yourself!" />
        <h2 className="used-cameras-container">Add your custom camera here:</h2>
        <div className="form-container">
          <form>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <label>
              Price:
              <input type="number" name="price" />
            </label>
            <label>
              Mpix:
              <input type="number" name="mpix" />
            </label>
            <label>
              Manufacture date:
              <input type="date" name="date" />
            </label>
            <label>Type:</label>
            <select name="type">
              <option value="dslr">DSLR</option>
              <option value="mirrorless">Mirrorless</option>
              <option value="compact">Compact</option>
              <option value="ultrazoom">Ultrazoom</option>
            </select>
            <div className="shop-stab__list">
              <label className="shop-stab__option">
                <input className="checkbox_shop" type="checkbox" name="stab" value="none" />
                None
              </label>
              <label className="shop-stab__option">
                <input className="checkbox_shop" type="checkbox" name="stab" value="optical" />
                Optical
              </label>
              <label className="shop-stab__option">
                <input className="checkbox_shop" type="checkbox" name="stab" value="matrix" />
                Matrix
              </label>
            </div>
            <div className="shop-stock">
              <input
                className="checkbox_shop btn_stock"
                id="stock"
                type="checkbox"
                name="stock"
                value="on"
              />
              <label htmlFor="stock" className="shop-options__text">
                In stock?
              </label>
            </div>
            <label>
              Add camera picture:
              <input type="file" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}
