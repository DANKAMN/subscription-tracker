import { Router } from "express"

import authorize from '../middlewares/auth.middleware.js'
import {
  createSubscription,
  getUserSubscriptions,
  updateSubscription,
  deleteSubscription,
  cancelSubscription,
  getUpcomingRenewals
} from "../controllers/subscription.controller.js"

const subscriptionRouter = Router()

subscriptionRouter.get('/:id', authorize, getUserSubscriptions)
subscriptionRouter.post('/', authorize, createSubscription)
subscriptionRouter.put('/:id', authorize, updateSubscription)
subscriptionRouter.delete('/:id', authorize, deleteSubscription)
subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription)
subscriptionRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals)

export default subscriptionRouter
