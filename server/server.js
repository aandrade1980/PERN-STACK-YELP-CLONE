require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

// Get all Restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query(
      'select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;'
    );
    res.status(200).json({
      status: 'success',
      results: results.rowCount,
      data: {
        restaurants: results.rows
      }
    });
  } catch (error) {
    console.error('Error on get all restaurants: ', error);
    res.status(500).json({
      status: 'fail',
      message: error
    });
  }
});

// Get a Restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await db.query(
      'select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1',
      [req.params.id]
    );

    const reviews = await db.query(
      'select * from reviews where restaurant_id = $1 ',
      [req.params.id]
    );

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
      }
    });
  } catch (error) {
    console.error('Error on get a restaurant: ', error);
  }
});

// Create a Restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *',
      [req.body.name, req.body.location, req.body.price_range]
    );

    console.log('results => ', results);
    res.status(201).json({
      status: 'success',
      data: {
        restaurant: results.rows[0]
      }
    });
  } catch (error) {
    console.error(error);
  }
});

// Update a Restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *',
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0]
      }
    });
  } catch (error) {
    console.error(error);
  }
});

// Delete a Restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM restaurants where id = $1', [req.params.id]);
    res.status(204).json({
      status: 'success'
    });
  } catch (error) {
    console.error(error);
  }
});

// Add a Review to a Restaurant
app.post('/api/v1/restaurants/:id/review', async (req, res) => {
  try {
    const result = await db.query(
      'INSERT INTO reviews (restaurant_id, name, rating, review) values ($1, $2, $3, $4)',
      [req.params.id, req.body.name, req.body.rating, req.body.review]
    );

    res.status(201).json({
      status: 'success',
      data: {
        reviews: result.rows[0]
      }
    });
  } catch (error) {
    console.error(error);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server is up and listening in port ${port}`)
);
