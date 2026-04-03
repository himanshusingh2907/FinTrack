import {z} from "zod"

const transactionSchemaValidator=z.object({
  amount:z.number().positive(),
  type:z.enum(["income","expense"]),
  category:z.string().min(1,"category is required"),
  date:z.coerce.date(),
  notes:z.string()
  .optional(),





})

export default transactionSchemaValidator;