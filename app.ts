import express, { Request, Response } from 'express';
import authRoutes from './src/routes/auth'; 
import postRoutes from './src/routes/post'; 

const app = express();

app.use(express.json()); 

sequelize.sync().then(() => {
  console.log('Database connected');
}).catch(error => {
  console.error('Database connection failed:', error);
});

// Middleware setup (body-parser, authentication middleware, etc.)

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// ...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





