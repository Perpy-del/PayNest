import { Request, Response, NextFunction } from "express";
import { config } from '../../config/envConfig.js';

import jwt from 'jsonwebtoken';

async function authenticateUser(request: Request, response: Response, next: NextFunction) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
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
    jwt.verify(token, config.jwt_access as string);
  } catch (error) {
    return response.status(401).json({
      data: {
        error: {
          title: 'Authentication Error',
          message: 'Please authenticate to continue.',
        },
      },
    });
  }

  next();
}

export default authenticateUser;
