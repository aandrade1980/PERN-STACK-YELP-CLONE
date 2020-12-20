import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

import StarRating from './StarRating';

const RestaurantList = () => {
  const { deleteRestaurant } = useContext(RestaurantContext);
  const history = useHistory();
  const { restaurants, setRestaurants } = useContext(RestaurantContext);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await RestaurantFinder.get('/');

        console.log('response => ', response.data.data.restaurants);
        setRestaurants(response.data.data.restaurants);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRestaurants();
  }, [setRestaurants]);

  const handleDeleteRestaurant = async (e, id) => {
    e.stopPropagation();
    try {
      await RestaurantFinder.delete(`/${id}`);

      deleteRestaurant(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = id => {
    history.push(`/restaurants/${id}`);
  };

  const renderRating = (average_rating, count) => {
    if (!count) {
      return <span className="text-warning ml-1">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={average_rating} />{' '}
        <span className="text-warning ml-1">({count})</span>
      </>
    );
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
            restaurants.map(
              ({ id, name, location, price_range, count, average_rating }) => (
                <tr onClick={() => handleRestaurantSelect(id)} key={id}>
                  <td>{name}</td>
                  <td>{location}</td>
                  <td>{'$'.repeat(price_range)}</td>
                  <td>{renderRating(average_rating, count)}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={e => handleUpdate(e, id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={e => handleDeleteRestaurant(e, id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
