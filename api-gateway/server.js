const express = require('express');
const { setupLogging } = require('./logging');
const { setupProxies } = require('./proxy');
const { setupRateLimit } = require('./ratelimit');
const { ROUTES } = require('./routes');

const app = express();
const port = 3000;

setupLogging(app);
setupRateLimit(app, ROUTES);
setupProxies(app, ROUTES);

// Catch all other routes and return a 404 not found
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`API gate way is running on ${port}`);
});
