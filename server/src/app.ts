// src/app.ts

import express, { Request, Response } from 'express';
import { connectToDatabase } from './utils/DbConfig';
import { ENV } from './utils/EnviromentVar'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { routenotFound } from './middlewares/ErrorMiddlewares'
import { errorHandler } from './middlewares/ErrorMiddlewares'
import { route } from './routes';

const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(morgan('dev')); // Log HTTP requests

// CORS configuration
app.use(
    cors({
        origin: ['http://localhost:5173', 'https://localhost:5174'], // Allowed origins
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
        credentials: true, // Allow cookies or authentication headers
    })
);

// Routes
app.use('/api', route);



app.use(routenotFound); // Route not found middleware
app.use(errorHandler); // Global error handler

// Connect to the database
connectToDatabase();

// Start the server
app.listen(ENV.PORT, () => {
    console.log(`Server is running on http://localhost:${ENV.PORT}`);
});
