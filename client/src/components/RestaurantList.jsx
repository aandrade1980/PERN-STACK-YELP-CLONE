import React, { useContext, useEffect } from 'react';

import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

const RestaurantList = () => {
  const { deleteRestaurant } = useContext(RestaurantContext);
  const { restaurants, setRestaurants } = useContext(RestaurantContext);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await RestaurantFinder.get('/');

        setRestaurants(response.data.data.restaurants);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRestaurants();
  }, [setRestaurants]);

  const handleDeleteRestaurant = async id => {
    try {
      await RestaurantFinder.delete(`/${id}`);

      deleteRestaurant(id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="list-group">
      <table className="table table-hover">
        <thead className="bg-primary text-white">
          <tr>
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody className="table-dark">
          {restaurants &&
            restaurants.map(({ id, name, location, price_range }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{location}</td>
                <td>{'$'.repeat(price_range)}</td>
                <td>Rating</td>
                <td>
                  <button className="btn btn-warning">Update</button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteRestaurant(id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
