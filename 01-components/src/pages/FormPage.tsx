import { CameraData } from 'assets/data';
import ShopCard from 'components/ShopCard';
import React from 'react';
import { Link } from 'react-router-dom';
import validFileType from 'utils/fileUtils';
import Footer from '../components/Footer';
import Header from '../components/Header';

interface FormState {
  name: string;
  price: number;
  mpix: number;
  date: string;
  type: string;
  stabNone: boolean;
  stabOptical: boolean;
  stabMatrix: boolean;
  stock: boolean;
}

export const userCameras: CameraData[] = [];

export default class FormPage extends React.Component<unknown, FormState> {
  name: React.RefObject<HTMLTextAreaElement>;
  price: React.RefObject<HTMLInputElement>;
  mpix: React.RefObject<HTMLInputElement>;
  date: React.RefObject<HTMLInputElement>;
  type: React.RefObject<HTMLSelectElement>;
  stabNone: React.RefObject<HTMLInputElement>;
  stabOptical: React.RefObject<HTMLInputElement>;
  stabMatrix: React.RefObject<HTMLInputElement>;
  stock: React.RefObject<HTMLInputElement>;
  file: React.RefObject<HTMLInputElement>;
  submit: React.RefObject<HTMLButtonElement>;

  constructor(props: unknown) {
    super(props);
    this.name = React.createRef();
    this.price = React.createRef();
    this.mpix = React.createRef();
    this.date = React.createRef();
    this.type = React.createRef();
    this.stabNone = React.createRef();
    this.stabOptical = React.createRef();
    this.stabMatrix = React.createRef();
    this.stock = React.createRef();
    this.file = React.createRef();
    this.submit = React.createRef();
  }

  componentDidMount() {
    if (this.submit.current) this.submit.current.disabled = true;
  }

  enableSubmitButton = () => {
    if (this.submit.current) this.submit.current.disabled = false;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    let stab = '';
    if (this.stabOptical.current?.checked === true) stab = 'optical';
    if (this.stabMatrix.current?.checked === true) stab = 'matrix';
    if (this.stabOptical.current?.checked === true && this.stabMatrix.current?.checked === true)
      stab = 'optical, matrix';
    if (this.stabOptical.current?.checked === false && this.stabMatrix.current?.checked === false)
      stab = 'none';

    let name = String(this.name.current?.value) || 'Camera';
    if (this.date.current?.value) name += ` made on ${this.date.current?.value}`;

    const fileTypes = ['image/jpeg', 'image/jpeg', 'image/png'];
    const files = this.file.current?.files;
    let img = 'no-image' as File | string;
    console.log(this.file.current?.files);

    if (files) {
      img = files[0];
      if (validFileType(img, fileTypes)) {
        img = window.URL.createObjectURL(img);
      } else {
        if (this.submit.current) this.submit.current.disabled = true;
        this.file.current?.setCustomValidity(
          'Unsupported file format. Please, upload jpg or png image.'
        );
        this.file.current?.reportValidity();
        this.file.current?.setCustomValidity('');
        event.preventDefault();
        return;
      }
    }

    const addCamera: CameraData = {
      num: String(userCameras.length + 1),
      name: name || 'Camera',
      mpix: this.mpix.current?.value || '0',
      price: this.price.current?.value || '0',
      manufacturer: 'Unknown',
      type: this.type.current?.value || 'DSLR',
      stabilization: stab,
      img: img as string,
      stock: this.stock.current?.checked || true,
    };
    userCameras.push(addCamera);
    console.log(userCameras);
    this.forceUpdate();
    event.preventDefault();
  };

  render() {
    const cards = userCameras.map((item) => <ShopCard key={item.num} {...item} />);
    return (
      <div className="root">
        <Header pageName="Used Cameras: Browse And Add Yourself!" />
        <div className="used-cameras-container">
          <div className="used-cameras-left">
            <h2 className="used-cameras-heading">Add your custom camera here:</h2>
            <form className="form-container" onSubmit={this.handleSubmit}>
              <label className="form-input">
                Name:
                <textarea
                  required
                  className="form-textarea"
                  rows={2}
                  name="name"
                  placeholder="Manufacturer and model"
                  ref={this.name}
                  onChange={this.enableSubmitButton}
                />
              </label>
              <label className="form-input">
                Price:
                <input
                  min={0}
                  defaultValue={0}
                  className="form-select"
                  type="number"
                  name="price"
                  ref={this.price}
                />
                UAH
              </label>
              <label className="form-input">
                Mpix:
                <input
                  min={0}
                  defaultValue={0}
                  className="form-select"
                  type="number"
                  name="mpix"
                  ref={this.mpix}
                />
              </label>
              <label className="form-input">
                Manufacture date:
                <input className="form-select" type="date" name="date" ref={this.date} />
              </label>
              <label className="form-input">
                Type:
                <select className="form-select" name="type" ref={this.type}>
                  <option value="dslr">DSLR</option>
                  <option value="mirrorless">Mirrorless</option>
                  <option value="compact">Compact</option>
                  <option value="ultrazoom">Ultrazoom</option>
                </select>
              </label>
              <div className="form-stab__list form-stab__text">
                Stabilization:
                <label className="form-stab__option">
                  <input
                    className="form-checkbox"
                    type="checkbox"
                    name="stabOptical"
                    value="optical"
                    ref={this.stabOptical}
                  />
                  Optical
                </label>
                <label className="form-stab__option">
                  <input
                    className="form-checkbox"
                    type="checkbox"
                    name="stabMatrix"
                    value="matrix"
                    ref={this.stabMatrix}
                  />
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
                  defaultChecked={true}
                  ref={this.stock}
                />
                <label htmlFor="stock" className="form-stock__option">
                  In stock?
                </label>
              </div>
              <label className="form-input">
                Picture:
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  ref={this.file}
                  onChange={this.enableSubmitButton}
                />
              </label>
              <button type="submit" className="button_small" ref={this.submit}>
                Submit
              </button>
            </form>
            <Link to="/">
              <button className="button_big">Return to main</button>
            </Link>
          </div>
          <div className="shop-page">
            {cards.length === 0 ? 'No user added cameras so far. Please add some!' : cards}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
