import { ROLES } from "../utils/constants.js"


const roleCheck = (allowedRoles) => (req, res, next) => {
  try {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied — insufficient permissions"
      })
    }
    next();
  }
  catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

export const isViewer = roleCheck([ROLES.VIEWER, ROLES.ANALYST, ROLES.ADMIN])
export const isAnalyst = roleCheck([ROLES.ANALYST, ROLES.ADMIN])
export const isAdmin = roleCheck([ROLES.ADMIN])

export default roleCheck;