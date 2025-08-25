import { Router } from "express";

import authorize from '../middlewares/auth.middleware.js'
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router()

subscriptionRouter.get('/', )

subscriptionRouter.get('/:id', authorize, getUserSubscriptions)

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'Update subscription' }))

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'Delete subscription' }))

subscriptionRouter.get('/user/:id', (req, res) => res.send({ title: 'Get all user subscriptions' }))

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: 'Cancel subscription' }))

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'Get upcoming renewals' }))


export default subscriptionRouter