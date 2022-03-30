import faker from "@faker-js/faker";
import Category from "../models/Category.model";
import Container from "../models/Container.model";
import Cour from "../models/Cour.model";
import Section from "../models/Section.model";
import database from "../config/db";

main()
  .then(() => console.log("Seeded"))
  .catch((err) => console.log(err))
  .finally(() => process.exit());

async function main(): Promise<void> {
  await database();
  const cour = await Cour.create({
    size: faker.datatype.float({
      min: 10,
      max: 30,
    }),
  });

  const sections = await Promise.all(
    new Array(8).fill(null).map(async () => ({
      category: faker.random.arrayElement(await Category.find()),
      containers: faker.random.arrayElements(await Container.find()),
    }))
  );

  await Section.create(sections);
}
