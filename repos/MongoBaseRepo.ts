import { Model, FilterQuery, HydratedDocument } from "mongoose";

type BaseRepo<T> = Reader<T> & Writer<T>;

export default class MongoBaseRepo<T> implements BaseRepo<T> {
  constructor(public readonly model: Model<T>) {}

  find(filter?: Partial<T>): Promise<T[]> {
    return this.model.find({ filter }).exec();
  }
  findOne(filter: Partial<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }
  findById(id: string | number): Promise<T | null> {
    return this.model.findById(id).exec();
  }
  create(data: Omit<T, "id" | "_id">): Promise<T> {
    return this.model.create(data);
  }
  createMany(data: Omit<T[], "id" | "_id">): Promise<T[]> {
    return this.createMany(data);
  }
  update(id: string | number, data: Omit<T, "id" | "_id">): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data).exec();
  }
  destroy(id: string | number): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
