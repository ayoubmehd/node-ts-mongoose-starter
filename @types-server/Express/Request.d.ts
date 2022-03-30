import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  declare namespace Express {
    interface Request {
      user?: string | Omit<User, "password">;
    }
  }
  interface CustomRequest<T> extends Request {
    body: T;
  }
}
