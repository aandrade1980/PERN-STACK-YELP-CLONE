import React, { useContext, useState } from 'react';

import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantContext);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('Price Range');

  const submitRestaurant = async e => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post('/', {
        name,
        location,
        price_range: priceRange
      });

      addRestaurant(response.data.data.restaurant);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="row">
          <div className="col">
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="location"
              id="location"
              className="form-control"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              name="priceRange"
              id="priceRange"
              className="form-select custom-select mr-sm-2"
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col-sm-1">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitRestaurant}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
