import User from "../models/userSchema.js"
import { ROLES, STATUS } from "../utils/constants.js"

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found"
      })
    }
    return res.status(200).json({
      users,
      message: "All users fetched successfully"
    })
  }
  catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const updateRole = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { role } = req.body;

    if (!Object.values(ROLES).includes(role)) {
      return res.status(400).json({ message: "Invalid role" })
    }

    const user = await User.findByIdAndUpdate(user_id, { role }, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User does not exist"
      })
    }
    return res.status(200).json({
      message: "Role updated successfully",
      user
    })
  }
  catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const updateStatus = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { status } = req.body;

    if (!Object.values(STATUS).includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const user = await User.findByIdAndUpdate(user_id, { status }, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User does not exist"
      })
    }
    return res.status(200).json({
      message: "Status updated successfully",
      user
    })
  }
  catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}