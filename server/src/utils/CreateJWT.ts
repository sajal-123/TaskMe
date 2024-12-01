import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { ENV } from './EnviromentVar';

interface JwtPayload {
  userId: string;
}

export const createJWT = (res: Response, userId: string): Response => {
  // Create the JWT token
  const token = jwt.sign({ userId }, ENV.JWT_SECRET as string, {
    expiresIn: '1d', // Set expiration time (1 day in this case)
  });

  // Set the token in the response as a cookie
  res.cookie('token', token, {
    httpOnly: true,  // Prevent access to the cookie from JavaScript (helps prevent XSS attacks)
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    sameSite: 'strict',  // Restrict cookie to same site (helps prevent CSRF attacks)
    maxAge: 1 * 24 * 60 * 60 * 1000, // Set max age of the cookie (1 day in milliseconds)
  });

  return res.json({ message: 'Authentication successful' });
};
