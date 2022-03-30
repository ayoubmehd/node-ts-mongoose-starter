module.exports = `
import { NextFunction, Request, Response, Router } from "express";
import [name_uppper]Model from "../models/[name_uppper].model";
import MongoBaseRepo from "../repos/MongoBaseRepo";

const [name] = new MongoBaseRepo<[name_uppper]>([name_uppper]Model);

export async function index(req: Request, res: Response, next: NextFunction) {
  res.json(await [name].find());
}
export async function create(
  req: CustomRequest<Omit<[name_uppper], "_id">>,
  res: Response,
  next: NextFunction
) {
  res.json(await [name].create(req.body));
}
export async function findOne(req: Request, res: Response, next: NextFunction) {
  res.json(await [name].findById(req.params.id));
}
export async function update(
  req: CustomRequest<Omit<[name_uppper], "_id">>,
  res: Response,
  next: NextFunction
) {
  res.json(await [name].update(req.params.id, req.body));
}
export async function destroy(req: Request, res: Response, next: NextFunction) {
  res.json(await [name].destroy(req.params.id));
}

`;
