import faker from "@faker-js/faker";
import database from "../config/db";

main()
  .then(() => console.log("Seeded"))
  .catch((err) => console.log(err))
  .finally(() => process.exit());

async function main(): Promise<any> {
  await database();

  await model.create({});
}
