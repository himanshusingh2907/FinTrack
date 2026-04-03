import {createTransaction,getTransactions,updateTransaction,deleteTransaction} from "../controllers/transactionController.js"
import { isViewer, isAnalyst, isAdmin } from "../middlewares/role.js"
import auth from "../middlewares/auth.js"

import express from "express"

const transactionRouter = express.Router();

transactionRouter.post("/", auth, isAdmin, createTransaction)
transactionRouter.get("/", auth, isViewer, getTransactions)
transactionRouter.patch("/:id", auth, isAdmin, updateTransaction)
transactionRouter.delete("/:id", auth, isAdmin, deleteTransaction)

export default transactionRouter;



