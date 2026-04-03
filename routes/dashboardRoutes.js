import {getSummary,getCategoryStats,getRecent,getMonthlyTrends,getWeeklyTrends,getDailyTrends} from "../controllers/dashboardController.js"
import { isViewer, isAnalyst, isAdmin } from "../middlewares/role.js"
import auth from "../middlewares/auth.js"

import express from "express" 
const dashboardRouter=express.Router();

dashboardRouter.get('/summary',auth,isAnalyst,getSummary);
dashboardRouter.get('/category',auth,isAnalyst,getCategoryStats);
dashboardRouter.get('/recent',auth,isAnalyst,getRecent);
dashboardRouter.get('/trends/monthly',auth,isAnalyst,getMonthlyTrends);
dashboardRouter.get('/trends/weekly',auth,isAnalyst,getWeeklyTrends);
dashboardRouter.get('/trends/daily',auth,isAnalyst,getDailyTrends);



export default dashboardRouter;