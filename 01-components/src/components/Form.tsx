import { CameraData } from 'assets/cameraData';
import React from 'react';
import validFileType from 'utils/fileUtils';
import { stabStringFromCheckboxes } from 'utils/formUtils';

interface FormPageProps {
  addCamera: (cameraData: CameraData) => void;
}

interface FormPageState {
  success: boolean;
}

interface FormRefs {
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
}

export default class CameraForm extends React.Component<FormPageProps, FormPageState> {
  ref: FormRefs;

  constructor(props: FormPageProps) {
    super(props);
    this.state = {
      success: false,
    };
    this.ref = {
      name: React.createRef(),
      price: React.createRef(),
      mpix: React.createRef(),
      date: React.createRef(),
      type: React.createRef(),
      stabNone: React.createRef(),
      stabOptical: React.createRef(),
      stabMatrix: React.createRef(),
      stock: React.createRef(),
      file: React.createRef(),
      submit: React.createRef(),
    };
  }

  componentDidMount() {
    this.ref.submit.current.disabled = true;
  }

  enableSubmitButton = () => {
    this.ref.submit.current.disabled = false;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const refs = this.ref;
    const stab = stabStringFromCheckboxes(
      refs.stabOptical.current.checked,
      refs.stabMatrix.current.checked
    );

    let name = String(this.ref.name.current?.value) || 'Camera';
    if (this.ref.date.current?.value) name += ` made on ${this.ref.date.current?.value}`;

    const fileTypes = ['image/jpeg', 'image/jpeg', 'image/png'];
    const files = this.ref.file.current?.files;
    let img = 'no-image' as File | string;

    if (files?.length) {
      img = files[0];
      if (validFileType(img, fileTypes)) {
        img = window.URL.createObjectURL(img);
      } else {
        if (this.ref.submit.current) this.ref.submit.current.disabled = true;
        this.ref.file.current?.setCustomValidity(
          'Unsupported file format. Please, upload jpg or png image.'
        );
        this.ref.file.current?.reportValidity();
        this.ref.file.current?.setCustomValidity('');
        event.preventDefault();
        return;
      }
    }

    const addCamera: CameraData = {
      num: '0',
      name: name || 'Camera',
      mpix: this.ref.mpix.current?.value || '0',
      price: this.ref.price.current?.value || '0',
      manufacturer: 'Unknown',
      type: this.ref.type.current?.value || 'DSLR',
      stabilization: stab,
      img: img as string,
      stock: this.ref.stock.current?.checked || true,
    };
    this.props.addCamera(addCamera);
    this.setState({
      success: true,
    });

    const form = event.target as HTMLFormElement;
    form.reset();
    event.preventDefault();
    setTimeout(
      () =>
        this.setState({
          success: false,
        }),
      2000
    );
  };

  render() {
    let successMessage: JSX.Element;
    if (this.state.success) {
      successMessage = <div className="form-success">The data is saved, thanks!</div>;
    } else {
      successMessage = <div></div>;
    }

    return (
      <form className="form-container" onSubmit={this.handleSubmit}>
        <label className="form-input">
          Name:
          <textarea
            required
            className="form-textarea"
            rows={2}
            name="name"
            placeholder="Manufacturer and model"
            ref={this.ref.name}
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
            ref={this.ref.price}
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
            ref={this.ref.mpix}
          />
        </label>

        <label className="form-input">
          Manufacture date:
          <input className="form-select" type="date" name="date" ref={this.ref.date} />
        </label>

        <label className="form-input">
          Type:
          <select className="form-select" name="type" ref={this.ref.type}>
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
              ref={this.ref.stabOptical}
            />
            Optical
          </label>
          <label className="form-stab__option">
            <input
              className="form-checkbox"
              type="checkbox"
              name="stabMatrix"
              value="matrix"
              ref={this.ref.stabMatrix}
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
            ref={this.ref.stock}
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
            ref={this.ref.file}
            onChange={this.enableSubmitButton}
          />
        </label>

        <button type="submit" className="button_small" ref={this.ref.submit}>
          Submit
        </button>

        {successMessage}
      </form>
    );
  }
}
