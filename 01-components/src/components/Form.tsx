import React from 'react';
import { CameraData } from 'assets/cameraData';
import validFileType from 'utils/fileUtils';
import { stabStringFromCheckboxes } from 'utils/formUtils';

interface FormPageProps {
  addCamera: (cameraData: CameraData) => void;
}

interface FormPageState {
  success: boolean;
}

interface FormRefs {
  name: React.RefObject<HTMLInputElement>;
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
          <input
            className="form-select stretch"
            type="text"
            name="name"
            ref={this.ref.name}
            onChange={this.enableSubmitButton}
          />
        </label>

        <label className="form-input column">
          Description:
          <textarea
            required
            className="form-textarea"
            rows={2}
            name="name"
            placeholder="Description for a movie"
            // ref={this.ref.name}
          />
        </label>

        <label className="form-input">
          Your score:
          <input
            min={0}
            max={10}
            defaultValue={10}
            className="form-select"
            type="number"
            name="price"
            ref={this.ref.price}
          />
          / 10
        </label>

        <label className="form-input">
          Release date:
          <input className="form-select" type="date" name="date" ref={this.ref.date} />
        </label>

        <label className="form-input">
          Status:
          <select className="form-select" name="type" ref={this.ref.type}>
            <option value="Released">Released</option>
            <option value="Rumored">Rumored</option>
            <option value="Planned">Planned</option>
            <option value="In Production">In Production</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>

        <div className="form-stab__list form-stab__text">
          Genre:
          <label className="form-stab__option">
            <input
              className="form-checkbox"
              type="checkbox"
              name="stabOptical"
              value="optical"
              ref={this.ref.stabOptical}
            />
            Action
          </label>
          <label className="form-stab__option">
            <input
              className="form-checkbox"
              type="checkbox"
              name="stabMatrix"
              value="matrix"
              ref={this.ref.stabMatrix}
            />
            Comedy
          </label>
          <label className="form-stab__option">
            <input
              className="form-checkbox"
              type="checkbox"
              name="stabMatrix"
              value="matrix"
              ref={this.ref.stabMatrix}
            />
            Drama
          </label>
          <label className="form-stab__option">
            <input
              className="form-checkbox"
              type="checkbox"
              name="stabMatrix"
              value="matrix"
              ref={this.ref.stabMatrix}
            />
            Fantasy
          </label>
          <label className="form-stab__option">
            <input
              className="form-checkbox"
              type="checkbox"
              name="stabMatrix"
              value="matrix"
              ref={this.ref.stabMatrix}
            />
            Other
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
            Viewed?
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
