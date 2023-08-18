const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Regular Express Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Regular Express server is running on port ${PORT}`);
});

// Serverless Configuration
const serverless = require('serverless-http');
const serverlessApp = express();

serverlessApp.use(express.json());
serverlessApp.use('/api/users', userRoutes);
serverlessApp.use('/api/posts', postRoutes);
serverlessApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports.handler = serverless(serverlessApp);
