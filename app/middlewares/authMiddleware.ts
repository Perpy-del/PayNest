import { Request, Response, NextFunction } from 'express';
import env from '../../config/env';

import jwt from 'jsonwebtoken';
import db from '../../config/database/db';

async function authenticateUser(request: Request | any, response: Response, next: NextFunction) {
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
    const decoded: any = jwt.verify(token, env.jwt_access as string);

    const user = await db('users').where({ id: decoded.id }).first();

    if (!user) {
      return response.status(401).json({
        data: {
          error: {
            title: 'Authentication Error',
            message: 'User not found.',
          },
        },
      });
    }

    request.user = user;
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
