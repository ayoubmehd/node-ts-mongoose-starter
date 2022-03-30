import User from "../models/User";
import faker from "@faker-js/faker";
import { genSalt, hash } from "bcrypt";
import Role from "../models/Role.model";
import database from "../config/db";

main()
  .then(() => console.log("Seeded"))
  .catch((err) => console.log(err))
  .finally(() => process.exit());

async function main(): Promise<any> {
  await database();
  const roles = await Role.find();

  await User.create({
    username: faker.internet.userName(faker.name.firstName()),
    password: await genSalt(10).then((salt) => hash("12345678", salt)),
    role: faker.random.arrayElement(roles),
  });
}
