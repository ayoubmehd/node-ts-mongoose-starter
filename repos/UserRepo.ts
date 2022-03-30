import RoleModel from "@models/Role.model";
import UserModel from "@models/User.model";
import { compare, genSalt, hash } from "bcrypt";
import MongoBaseRepo from "./MongoBaseRepo";

export default class UserRepo extends MongoBaseRepo<User> {
  constructor() {
    super(UserModel);
  }

  async login(
    data: Omit<User, "id" | "_id" | "role">
  ): Promise<Omit<User, "password"> | null> {
    const user = await this.findOne({ username: data.username });

    if (!user) return null;

    const isPasswordCorrect = await compare(data.password, user.password);

    if (!isPasswordCorrect) return null;

    return { _id: user._id, username: user.username, role: user.role };
  }
}
