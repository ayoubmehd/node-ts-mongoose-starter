import { FilterQuery, HydratedDocument } from "mongoose";

declare global {
  interface Reader<T> {
    find(filter?: FilterQuery<T>): Promise<T[]>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    findById(id: string | number): Promise<T | null>;
  }
}
