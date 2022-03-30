import { NextFunction, Request, Response, Router } from "express";
import AuthModel from "@models/User.model";
import UserRepo from "@repos/UserRepo";
import { sign } from "jsonwebtoken";

const user = new UserRepo();

export async function login(
  req: CustomRequest<Omit<User, "_id">>,
  res: Response,
  next: NextFunction
) {
  const resUser = await user.login({
    username: req.body.username,
    password: req.body.password,
  });

  if (!resUser) {
    return res.status(400).json({
      message: "username or password are not correct",
    });
  }

  // generate and return JWT
  const jwt = sign(
    {
      user: resUser,
    },
    process.env.JWT_SECRET!
  );

  res.json({
    jwt,
    user: resUser,
  });
}
