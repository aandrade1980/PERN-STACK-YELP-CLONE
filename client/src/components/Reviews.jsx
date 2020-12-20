import React from 'react';
import StarRating from './StarRating';

const Reviews = ({ reviews }) => {
  return (
    <div className="row row-cols-3 mb-2 g-4">
      {reviews &&
        reviews.map(({ id, name, review, rating }) => (
          <div className="col" key={id}>
            <div className="card text-white bg-primary mb-3 p-2">
              <div className="car-header d-flex justify-content-between">
                <span>{name}</span>
                <span>
                  <StarRating rating={rating} />
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">{review}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Reviews;
