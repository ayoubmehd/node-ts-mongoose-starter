#!/usr/bin/env node

"use strict";
const { writeFileSync, fstat, existsSync } = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const controllersTemplate = require("./templates/controller");
const routesTemplate = require("./templates/route");

const routesNaming = "[name].ts";
const routesDir = path.join(__dirname, "../routes");
const controllersNaming = "[name].controller.ts";
const controllersDir = path.join(__dirname, "../controllers");

const questions = [
  {
    type: "input",
    name: "resource_name",
    message: "What's the resource name?",
  },
];

inquirer.prompt(questions).then((answers) => {
  const { resource_name } = answers;

  const conrollerFile = `${controllersDir}/${controllersNaming.replace(
    "[name]",
    resource_name
  )}`;
  const routeFile = `${routesDir}/${routesNaming.replace(
    "[name]",
    resource_name
  )}`;

  if (existsSync(conrollerFile)) {
    console.error(`File Already exists ${conrollerFile}`);
    process.exit();
  }
  if (existsSync(routeFile)) {
    console.error(`File Already exists ${routeFile}`);
    process.exit();
  }

  writeFileSync(
    conrollerFile,
    controllersTemplate
      .replaceAll("[name]", resource_name)
      .replaceAll(
        "[name_uppper]",
        resource_name.charAt(0).toUpperCase() + resource_name.slice(1)
      )
  );
  writeFileSync(routeFile, routesTemplate.replaceAll("[name]", resource_name));
});
