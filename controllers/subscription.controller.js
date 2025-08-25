import Subscription from '../models/subscription.models.js'

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        res.status(201).json({ success: true, data: subscription })
    } catch (error) {
        next(error)
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this account')
            error.status = 401
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id })

        res.status(201).json({ success: true, data: subscriptions })
    } catch (error) {
        next(error)
    }
}

// Update subscription by ID
export const updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.params

    const subscription = await Subscription.findOneAndUpdate(
      { _id: id, user: req.user._id }, // ensure only owner can update
      req.body,
      { new: true, runValidators: true }
    )

    if (!subscription) {
      const error = new Error('Subscription not found or not yours')
      error.status = 404
      throw error
    }

    res.status(200).json({ success: true, data: subscription })
  } catch (error) {
    next(error)
  }
}

// Delete subscription by ID
export const deleteSubscription = async (req, res, next) => {
  try {
    const { id } = req.params

    const subscription = await Subscription.findOneAndDelete({
      _id: id,
      user: req.user._id
    })

    if (!subscription) {
      const error = new Error('Subscription not found or not yours')
      error.status = 404
      throw error
    }

    res.status(200).json({ success: true, message: 'Subscription deleted successfully' })
  } catch (error) {
    next(error)
  }
}

// Cancel subscription (set status to "canceled")
export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.params

    const subscription = await Subscription.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { status: 'canceled' },
      { new: true }
    )

    if (!subscription) {
      const error = new Error('Subscription not found or not yours')
      error.status = 404
      throw error
    }

    res.status(200).json({ success: true, data: subscription })
  } catch (error) {
    next(error)
  }
}

// Get upcoming renewals (example: renewals in next 7 days)
export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const now = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(now.getDate() + 7)

    const subscriptions = await Subscription.find({
      user: req.user._id,
      nextRenewalDate: { $gte: now, $lte: nextWeek },
      status: { $ne: 'canceled' }
    })

    res.status(200).json({ success: true, data: subscriptions })
  } catch (error) {
    next(error)
  }
}