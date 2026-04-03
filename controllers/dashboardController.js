import Transaction from "../models/transactionSchema.js"

export const getSummary = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ])

    let income = 0, expense = 0
    result.forEach(item => {
      if (item._id === "income") income = item.total
      if (item._id === "expense") expense = item.total
    })

    return res.status(200).json({
      income,
      expense,
      balance: income - expense
    })
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getCategoryStats = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ])

    return res.status(200).json({ categories: result })
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getRecent = async (req, res) => {
  try {
    const transactions = await Transaction.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("createdBy", "name email")

    return res.status(200).json({ transactions })
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getMonthlyTrends = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ])

    return res.status(200).json({ trends: result })
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getWeeklyTrends = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            week: { $week: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.week": 1 } }
    ])

    return res.status(200).json({ trends: result })
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getDailyTrends = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
    ])

    return res.status(200).json({ trends: result })
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
}