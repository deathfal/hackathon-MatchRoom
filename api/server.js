const express = require('express');
const dataset = require('./dataset.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/hotels', (req, res) => {
  res.json(dataset);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
