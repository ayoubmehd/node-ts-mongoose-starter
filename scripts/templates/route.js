module.exports = `
import { Router } from "express";

import * as [name] from "../controllers/[name].controller";

const router = Router();

router.get("/", [name].index);
router.post("/", [name].create);
router.get("/:id", [name].findOne);
router.patch("/:id", [name].update);
router.delete("/:id", [name].destroy);

export default router;

`;
