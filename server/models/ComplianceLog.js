import mongoose from 'mongoose';

const safetyGapSchema = new mongoose.Schema({
  code: String,
  title: String,
  risk: String,
  area: String
});

const complianceLogSchema = new mongoose.Schema(
  {
    sopName: String,
    overallScore: Number,
    safetyGaps: [safetyGapSchema],
    missingDocs: [String],
    recommendations: [String]
  },
  { timestamps: true }
);

export default mongoose.models.ComplianceLog || mongoose.model('ComplianceLog', complianceLogSchema);
