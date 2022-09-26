import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default class FormPage extends React.Component {
  render() {
    return (
      <div className="root">
        <Header pageName="Used Cameras: Browse And Add Yourself!" />
        <div className="used-cameras-container">
          <div className="used-cameras-left">
            <h2 className="used-cameras-heading">Add your custom camera here:</h2>
            <form className="form-container">
              <label className="form-input">
                Name:
                <textarea className="form-textarea" rows={2} name="name" />
              </label>
              <label className="form-input">
                Price:
                <input className="form-select" type="number" name="price" />
                UAH
              </label>
              <label className="form-input">
                Mpix:
                <input className="form-select" type="number" name="mpix" />
              </label>
              <label className="form-input">
                Manufacture date:
                <input className="form-select" type="date" name="date" />
              </label>
              <label className="form-input">
                Type:
                <select className="form-select" name="type">
                  <option value="dslr">DSLR</option>
                  <option value="mirrorless">Mirrorless</option>
                  <option value="compact">Compact</option>
                  <option value="ultrazoom">Ultrazoom</option>
                </select>
              </label>
              <p className="form-stab__text">Stabilization:</p>
              <div className="form-stab__list">
                <label className="form-stab__option">
                  <input
                    className="form-checkbox"
                    type="checkbox"
                    checked
                    name="stab"
                    value="none"
                  />
                  None
                </label>
                <label className="form-stab__option">
                  <input className="form-checkbox" type="checkbox" name="stab" value="optical" />
                  Optical
                </label>
                <label className="form-stab__option">
                  <input className="form-checkbox" type="checkbox" name="stab" value="matrix" />
                  Matrix
                </label>
              </div>
              <div className="form-stock">
                <input
                  className="form-checkbox btn_stock"
                  id="stock"
                  type="checkbox"
                  name="stock"
                  value="on"
                  checked
                />
                <label htmlFor="stock" className="form-stock__option">
                  In stock?
                </label>
              </div>
              <label className="form-input">
                Picture:
                <input type="file" />
              </label>
              <input type="submit" className="button_small" value="Submit" />
            </form>
            <Link to="/">
              <button className="button_big">Return to main</button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
