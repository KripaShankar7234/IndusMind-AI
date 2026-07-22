import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
      unique: true
    },
    title: String,
    reportType: {
      type: String,
      enum: ['Root Cause Analysis', 'Maintenance Report', 'Audit Summary'],
      required: true
    },
    summary: String,
    sections: [
      {
        heading: String,
        content: String
      }
    ],
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

export default mongoose.models.Report || mongoose.model('Report', reportSchema);
