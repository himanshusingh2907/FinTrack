


import express from "express"
import {getAllUsers,updateRole,updateStatus} from "../controllers/userController.js"
import auth from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/role.js"

const router = express.Router();

router.get("/", auth, isAdmin, getAllUsers);
router.patch("/:id/role", auth, isAdmin, updateRole);
router.patch("/:id/status", auth, isAdmin, updateStatus);

export default router;