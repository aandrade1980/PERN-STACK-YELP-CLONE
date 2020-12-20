import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const AddReview = () => {
  const history = useHistory();
  const { id } = useParams();
  const [values, setValues] = useState({ name: '', rating: '0', review: '' });

  const onChange = e =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const submitReview = async e => {
    e.preventDefault();
    try {
      await RestaurantFinder.post(`/${id}/review`, {
        restaurant_id: id,
        name: values.name,
        rating: values.rating,
        review: values.review
      });

      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-2">
      <form action="">
        <div className="row mb-3">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Name"
              value={values.name}
              onChange={onChange}
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              name="rating"
              id="rating"
              className="form-select custom-select"
              value={values.rating}
              onChange={onChange}
            >
              <option value="0" disabled>
                Rating
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="Review">Review</label>
          <textarea
            name="review"
            id="review"
            cols="30"
            rows="10"
            className="form-control"
            value={values.review}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitReview}
        >
          Sumbit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
