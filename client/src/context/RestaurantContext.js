import React, { useState, createContext } from 'react';

export const RestaurantContext = createContext({
  restaurants: [],
  setRestaurants: () => [],
  addRestaurant: restaurant => [],
  deleteRestaurant: id => [],
  selectedRestaurant: {},
  setSelectedRestaurant: () => {}
});

export const RestaurantContextProvider = props => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);

  const addRestaurant = newRestaurant =>
    setRestaurants([...restaurants, newRestaurant]);

  const deleteRestaurant = idToDelete =>
    setRestaurants(
      restaurants.filter(restaurant => restaurant.id !== idToDelete)
    );

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurant,
        deleteRestaurant,
        selectedRestaurant,
        setSelectedRestaurant
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
};
