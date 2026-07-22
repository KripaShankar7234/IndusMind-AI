import mongoose from 'mongoose';

const failureHistorySchema = new mongoose.Schema({
  date: String,
  issue: String,
  resolution: String
});

const equipmentSchema = new mongoose.Schema(
  {
    equipmentName: {
      type: String,
      required: true
    },
    tagId: {
      type: String,
      required: true,
      unique: true
    },
    location: String,
    status: {
      type: String,
      default: 'Normal Operations'
    },
    severity: {
      type: String,
      enum: ['Critical', 'High', 'Medium', 'Low'],
      default: 'Low'
    },
    possibleCause: String,
    oemRecommendation: String,
    preventiveAction: String,
    healthScore: {
      type: Number,
      default: 95
    },
    previousFailures: [failureHistorySchema]
  },
  { timestamps: true }
);

export default mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema);
