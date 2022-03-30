const { randomBytes } = require("crypto");
const { writeFileSync, readFileSync } = require("fs");
const envfile = require("envfile");

const env = readFileSync(".env");
const parsedEnv = envfile.parse(env.toString());

parsedEnv.JWT_SECRET = randomBytes(64).toString("base64");

writeFileSync(".env", Buffer.from(`${envfile.stringify(parsedEnv)}`));
