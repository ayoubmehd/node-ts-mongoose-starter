import { HydratedDocument } from "mongoose";

declare global {
  interface Writer<T> {
    create(data: Omit<T, "id" | "_id">): Promise<T>;
    createMany(data: Omit<T[], "id" | "_id">): Promise<T[]>;
    update(id: string | number, data: Omit<T, "id" | "_id">): Promise<T | null>;
    destroy(id: string | number): Promise<T | null>;
  }
}
