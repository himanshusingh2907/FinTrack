import Transaction from "../models/transactionSchema.js"
import transactionSchemaValidator from "../validators/transactionValidator.js"

export const createTransaction=async(req,res)=>{
  try {
    const result =transactionSchemaValidator.safeParse(req.body);
    if (!result.success){
      return res.status(400).json({
        message:"fields are missing"
      })
    }
    const {amount,type,category,date,}=result.data;
    const  transaction= await Transaction.create({
      amount,type,category,date,
      createdBy: req.user.userId  
    });

    return res.status(201).json({
      message:"the transaction has been created",
      transaction
    })

  }
  catch (error) {
       return res.status(500).json({
        message:error.message
       })
  }
}


export const getTransactions = async (req, res) => {
  try {
   
    const { type, category, page = 1, limit = 10 } = req.query;

   
    
    const filter = { isDeleted: false };
    if (type) filter.type = type;
    if (category) filter.category = category;

   
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ date: -1 }); 

    const total = await Transaction.countDocuments(filter);

    return res.status(200).json({
      transactions,
      pagination: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit)
      }
    });
  }
  catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}


export const updateTransaction =async(req,res)=>{
  try {
    const transaction_id=req.params.id;
    const result=transactionSchemaValidator.partial().safeParse(req.body); 
        if(!result.success){
          return res.status(400).json({
            message:"the fields are missing"
          })
        }
    const {amount,type,category,date}=result.data;
    const transaction = await Transaction.findByIdAndUpdate(
  transaction_id,
  { $set: result.data }, 
  { new: true }
);
    if (!transaction){
      return res.status(404).json({
         message:"transaction does not exist"
      })
    }
    return res.status(200).json({
      message:"transaction has been updated",
      transaction
    })
  }
  catch(error){
    return res.status(500).json({
      message:error.message
    })
  }
}  

export const deleteTransaction=async(req,res)=>{
  try {
    const transaction_id=req.params.id;
    const transaction=await Transaction.findByIdAndUpdate(transaction_id,{isDeleted:true},{new:true});
    if(!transaction){
      return res.status(404).json({
        message:"transaction does not exist"
      })
    }
   
     return res.status(200).json({
      message:"transaction has been deleted"
     })
   
  }
  catch(error){
    return res.status(500).json({
      message:error.message
    })
  }
}