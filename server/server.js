const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const products = require('./db');
const {
  categoryFilter,
  minPriceFilter,
  maxPriceFilter
} = require('./validators');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

http.createServer(app).listen(3001, () => {
  console.log('Listen on 0.0.0.0:3001');
});

app.get('/', (_, res) => {
  res.send({ status: 200 });
});

process.on('SIGINT', function () {
  process.exit();
});


app.post('/create-product', (req, res) => {
  let input =  req.body;
  // Sanitize input

  const newProduct = {
    // Generate UUID
    id: Math.random(),
    name: input['name'],
    category: input['category'],
    price: input['price']
  };
  products.push(newProduct);
  res.send({ status: 200 });
});


app.get('/get-products', (req, res) => {
  const queryParams = req.query;
  // Choose the limit on how many results we return
  const limit = queryParams.limit || 24;
  // Page indicator, here we choose that the frontend should be the one to move the
  // page forward
  const offset = queryParams.offset || 0;

  const categoryFilterFunc = categoryFilter(queryParams.category);
  const minPriceFilterFunc = minPriceFilter(queryParams.minPrice);
  const maxPriceFilterFunc = maxPriceFilter(queryParams.maxPrice);

  let filteredList = [];

  products.forEach((product) => {
    const match = categoryFilterFunc(product.category) && minPriceFilterFunc(product.price) && maxPriceFilterFunc(product.price);
    if(match) {
      filteredList.push(product);
    }
  })

  res.json(filteredList.slice(offset, limit))
})

app.get('/get-product/:id', (req, res) => {
  let productId = req.params.id;
  let currentProduct = products.find((product) => product.id == productId)

  const categoryFilterFunc = categoryFilter(currentProduct.category);

  let filteredList = [];

  products.forEach((product) => {
    let priceDiff = product.price - currentProduct.price;
    const match = categoryFilterFunc(product.category) && (priceDiff < 50 && priceDiff > -50)

    if(match) {
      filteredList.push(product);
    }
  })

  res.json(filteredList)
})
