import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import validFileType from 'utils/fileUtils';
import { MovieReqData } from 'utils/TMDBinterfaces';

interface FormPageProps {
  movieReq: (requestData: MovieReqData) => void;
}

export default function RequestForm(props: FormPageProps) {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    formState: { errors },
  } = useForm<MovieReqData>({
    mode: 'onChange',
  });
  const [successMessage, setSuccessMessage] = useState(null);

  const validateFile = (files: FileList) => {
    if (!files.length) return true;
    const img = files[0];
    const fileTypes = ['image/jpeg', 'image/jpeg', 'image/png'];
    if (validFileType(img, fileTypes)) return true;
    return false;
  };

  const onSubmit = (data: MovieReqData) => {
    setSuccessMessage(<div className="form-success">The data is saved, thanks!</div>),
      setTimeout(() => setSuccessMessage(null), 2000);
    props.movieReq(data);
    reset();
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <label className="form-input">
        Title:
        <input
          className="form-select stretch"
          type="text"
          {...register('title', { required: true })}
        />
      </label>
      {errors.title && (
        <span className="form-alert" role="alert">
          Please, enter the movie title
        </span>
      )}

      <label className="form-input column">
        Description:
        <textarea
          className="form-textarea"
          rows={2}
          {...register('description')}
          placeholder="Description for a movie"
        />
      </label>

      <label className="form-input">
        Your score:
        <input
          className="form-select"
          defaultValue={10}
          type="number"
          {...register('score', { required: true, min: 0, max: 10 })}
        />
        / 10
      </label>
      {errors.score && (
        <span className="form-alert" role="alert">
          Please, select your score from 0 to 10.
        </span>
      )}

      <label className="form-input">
        Release date:
        <input className="form-select" type="date" {...register('date')} />
      </label>

      <label className="form-input">
        Status:
        <select className="form-select" {...register('type')}>
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
          <input className="form-checkbox" type="checkbox" {...register('genres.action')} />
          Action
        </label>
        <label className="form-stab__option">
          <input className="form-checkbox" type="checkbox" {...register('genres.comedy')} />
          Comedy
        </label>
        <label className="form-stab__option">
          <input className="form-checkbox" type="checkbox" {...register('genres.drama')} />
          Drama
        </label>
        <label className="form-stab__option">
          <input className="form-checkbox" type="checkbox" {...register('genres.fantasy')} />
          Fantasy
        </label>
        <label className="form-stab__option">
          <input className="form-checkbox" type="checkbox" {...register('genres.other')} />
          Other
        </label>
      </div>

      <div className="form-stock">
        <input
          className="form-checkbox btn_stock"
          id="viewed"
          type="checkbox"
          {...register('viewed')}
          defaultChecked={true}
        />
        <label htmlFor="viewed" className="form-stock__option">
          Viewed?
        </label>
      </div>

      <label className="form-input">
        Picture:
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          {...register('files', { validate: validateFile })}
          // onChange={enableSubmitButton}
        />
      </label>
      {errors.files && (
        <span className="form-alert" role="alert">
          Unsupported file format. <br /> Please, upload jpg or png image.
        </span>
      )}

      <button type="submit" className="button_small" disabled={!formState.isValid}>
        Submit
      </button>

      {successMessage}
    </form>
  );
}
