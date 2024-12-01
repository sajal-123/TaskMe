import { Request, Response, NextFunction } from 'express';

// Handle 404 Errors (Route Not Found)
export const routenotFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Route not found: ${req.originalUrl}`) as any;
    error.status = 404;
    next(error);
};


// Error Handling Middleware (for example, handling internal server errors)
// Error Handler Middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500; // Default to 500 for internal server errors
    let message = 'Internal Server Error'; // Default error message
  
    // Specific handling for Mongoose CastError for ObjectId
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      statusCode = 404;
      message = 'Resource not found'; // Customize the message for ObjectId errors
    }
  
    // Log the error stack for non-production environments
    if (process.env.NODE_ENV !== 'production') {
      console.error(err.stack); // Log the error stack in development for debugging
    }
  
    // Send the response
    res.status(statusCode).json({
      message: message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack trace in production
    });
  };