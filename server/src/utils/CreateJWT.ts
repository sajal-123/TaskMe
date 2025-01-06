import jwt from 'jsonwebtoken';
import { ENV } from './EnviromentVar';

interface JwtPayload {
  userId: string;
}

export const createJWT = ( userId: string): any => {
  // Create the JWT token
  const token = jwt.sign({ userId }, ENV.JWT_SECRET as string, {
    expiresIn: '1d', // Set expiration time (1 day in this case)
  });


  return token;
};
