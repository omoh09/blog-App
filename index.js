const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());

const postRoutes = require('./routes/posts');

const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/users');


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
