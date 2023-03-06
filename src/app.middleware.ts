import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use({ headers }: Request, _: Response, next: NextFunction) {
    if (
      !headers ||
      !headers['authorization'] ||
      headers['authorization'].length === 0
    ) {
      next(new ForbiddenException('Authorization required'));
    }

    const token: string = headers['authorization'].split(' ')[1];

    try {
      const decoded: any = verify(token, process.env.SECRET, {
        algorithms: ['HS256'],
      });

      if (
        !decoded ||
        !decoded.origin ||
        !decoded.resource ||
        !decoded.timestamp
      ) {
        next(new UnauthorizedException('Unauthorized'));
      }

      if (Date.now() > decoded.timestamp + +process.env.MAX_REQUEST_MS_GAP) {
        next(new UnauthorizedException('Unauthorized'));
      }

      next();
    } catch (e) {
      console.error(e);
      next(new UnauthorizedException('Invalid token'));
    }
  }
}
