import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import * as UserServices from '../services/users';

interface IDecodedTokenData extends Object {
  data?: {
    mobile?: string;
  };
}

export async function isCurrentUserLoggedIn(req: Request, _: Response, next: NextFunction) {
  const { email } = req.params;

  if (!email) {
    next(new Error(`Cannot check if current user of email ${email} is logged in.`));
  }

  try {
    const token = extractTokenFromHeader(req.headers);
    const decoded: IDecodedTokenData = jwt.verify(token, process.env.SECRET_KEY!);

    const mobileFromToken = decoded.data?.mobile;

    const foundUserMobile = await UserServices.retrieveUserMobileFromEmail(email);
    const areMatchingMobiles = foundUserMobile === mobileFromToken;

    if (!areMatchingMobiles) {
      next(new Error(`You do not have access to this resource. Please re-check your credentials`));
    }

    next();
  } catch (error) {
    next(error);
  }
}

function extractTokenFromHeader(headers: any) {
  const authHeader = headers.authorization;
  return authHeader && authHeader.split(' ')[1];
}
