import mongoose from 'mongoose';
import { Plan } from '../models/plans.model.js';

export const seedPlans = async () => {
  const plans = [
    {
      id: 'starter',
      displayName: 'Starter',
      price: 499,
      maxChannels: 3,
      maxVideosPerMonth: 22,
      maxVideoLengthMinutes: 180,
      maxLiveStreamsMonth: 2,
      subscriptionShare: 0.75,
      adShare: 0.50,
      isActive: true
    },
    {
      id: 'mid',
      displayName: 'Growth',
      price: 999,
      maxChannels: 5,
      maxVideosPerMonth: 50,
      maxVideoLengthMinutes: 300,
      maxLiveStreamsMonth: 5,
      subscriptionShare: 0.80,
      adShare: 0.60,
      isActive: true
    },
    {
      id: 'max',
      displayName: 'Unlimited',
      price: 1999,
      maxChannels: -1,
      maxVideosPerMonth: -1,
      maxVideoLengthMinutes: -1,
      maxLiveStreamsMonth: -1,
      subscriptionShare: 0.85,
      adShare: 0.70,
      isActive: true
    }
  ];

  for (const plan of plans) {
    await Plan.updateOne(
      { id: plan.id },
      { $set: plan },
      { upsert: true }
    );
  }

  console.log(' Plans seeded successfully');
};
