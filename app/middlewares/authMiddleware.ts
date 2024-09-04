import { Request, Response, NextFunction } from 'express';
import env from '../../config/env.js';

import jwt from 'jsonwebtoken';

async function authenticateUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return response.status(401).json({
      data: {
        error: {
          title: 'Authentication Error',
          message: 'Please authenticate to continue.',
        },
      },
    });
  }

  const [bearer, token] = authorizationHeader.split(' ');

  try {
    jwt.verify(token, env.jwt_access as string);
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return response.status(401).json({
      data: {
        error: {
          title: 'Authentication Error',
          message: 'Invalid token. Please authenticate to continue.',
        },
      },
    });
  }
}

export default authenticateUser;
