import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './_middleware/error-handler';
import usersController from './users/users.controller';

// Load environment variables from .env file
dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API routes
app.use('/users', usersController);

// 🔥 Correct way to register error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

// Start server
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
