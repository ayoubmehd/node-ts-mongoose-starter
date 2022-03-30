import faker from "@faker-js/faker";
import database from "../config/db";
import ContainerModel from "../models/Container.model";
import PositionModel from "../models/Position.model";
import CategoryModel from "../models/Category.model";
import ContainerTypeModel from "../models/ContainerType.model";

main()
  .then(() => console.log("Seeded"))
  .catch((err) => console.log(err))
  .finally(() => process.exit());

async function main(): Promise<any> {
  await database();

  const data: Container = {
    origin: faker.address.country(),
    position: {
      X: faker.datatype.float({ min: 0, max: 50 }),
      Y: faker.datatype.float({ min: 0, max: 50 }),
      Z: faker.datatype.float({ min: 0, max: 50 }),
    },
    size: {
      X: Math.floor(faker.datatype.number({ min: 8, max: 12 })),
      Y: Math.floor(faker.datatype.number({ min: 2, max: 3 })),
      Z: Math.floor(faker.datatype.number({ min: 2, max: 3 })),
    },
    category: await CategoryModel.create({
      label: faker.lorem.word(),
    }),
    type: await ContainerTypeModel.create({
      label: faker.lorem.word(),
    }),
  };
  await ContainerModel.create(data);
}
