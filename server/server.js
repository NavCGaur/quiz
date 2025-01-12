import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/config.js';
import questionsRouter from './routes/Questions.js';
import { seedDatabase } from './seed.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


  
  // Routes
  app.use('/questions', questionsRouter);

  // Database connection
  mongoose.connect(config.mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

  // Start server
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
