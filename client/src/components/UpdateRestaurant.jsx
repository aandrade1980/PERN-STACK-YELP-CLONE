import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = () => {
  const { id } = useParams();
  const history = useHistory();
  const [values, setValues] = useState({
    name: '',
    location: '',
    price_range: 0
  });

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        const result = await RestaurantFinder.get(`/${id}`);

        const { name, location, price_range } = result.data.data.restaurant;
        setValues({ name, location, price_range });
      } catch (error) {
        console.error(error);
      }
    }

    fetchRestaurant();
  }, [id]);

  const onChange = e =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await RestaurantFinder.put(`/${id}`, {
        name: values.name,
        location: values.location,
        price_range: values.price_range
      });

      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form action="">
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={onChange}
            value={values.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            className="form-control"
            onChange={onChange}
            value={values.location}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name">Price Range</label>
          <input
            type="number"
            name="price_range"
            id="price_range"
            className="form-control"
            onChange={onChange}
            value={values.price_range}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleUpdate}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
