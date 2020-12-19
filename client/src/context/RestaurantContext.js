import React, { useState, createContext } from 'react';

export const RestaurantContext = createContext({
  restaurants: [],
  setRestaurants: () => [],
  addRestaurant: restaurant => [],
  deleteRestaurant: id => []
});

export const RestaurantContextProvider = props => {
  const [restaurants, setRestaurants] = useState([]);

  const addRestaurant = newRestaurant =>
    setRestaurants([...restaurants, newRestaurant]);

  const deleteRestaurant = idToDelete =>
    setRestaurants(
      restaurants.filter(restaurant => restaurant.id !== idToDelete)
    );

  return (
    <RestaurantContext.Provider
      value={{ restaurants, setRestaurants, addRestaurant, deleteRestaurant }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
};
