import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const [type, token] = req.headers.authorization?.split(" ") || [null, null];

  if (!token || !type) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = await verify(token, process.env.JWT_SECRET!);
    const user = <Omit<User, "password">>decoded;
    req.user = user;
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
}
