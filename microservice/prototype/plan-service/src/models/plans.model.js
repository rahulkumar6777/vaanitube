import mongoose from 'mongoose';

const planSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      enum: ['starter', 'mid', 'max'],
      index: true
    },

    displayName: {
      type: String,
      required: true,
      enum: ['Starter', 'Growth', 'Unlimited']
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    maxChannels: {
      type: Number,
      required: true
    },

    maxVideosPerMonth: {
      type: Number,
      required: true
    },

    maxVideoLengthMinutes: {
      type: Number,
      required: true
    },

    maxLiveStreamsMonth: {
      type: Number,
      required: true
    },

    subscriptionShare: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    },

    adShare: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    },

    isActive: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Plan = mongoose.model('Plan', planSchema);
