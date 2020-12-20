import React from 'react';

const StarRating = ({ rating }) => {
  const starts = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starts.push(
        <i
          className="fas fa-star text-warning"
          key={Math.random().toString(36)}
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      starts.push(
        <i
          className="fas fa-star-half-alt text-warning"
          key={Math.random().toString(36)}
        />
      );
    } else {
      starts.push(
        <i
          className="far fa-star text-warning"
          key={Math.random().toString(36)}
        />
      );
    }
  }

  return <>{starts}</>;
};

export default StarRating;
