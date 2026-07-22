import mongoose from 'mongoose';

const chunkSchema = new mongoose.Schema({
  chunkId: String,
  text: String,
  pageNumber: Number,
  embedding: [Number]
});

const documentSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true
    },
    fileSize: {
      type: String,
      required: true
    },
    uploadDate: {
      type: Date,
      default: Date.now
    },
    documentType: {
      type: String,
      enum: ['OEM Manual', 'Compliance', 'Technical Spec', 'Inspection', 'Incident RCA', 'SOP Document', 'Image OCR'],
      default: 'Technical Spec'
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    pages: {
      type: Number,
      default: 1
    },
    status: {
      type: String,
      enum: ['Processing', 'Processed', 'Failed'],
      default: 'Processing'
    },
    filePath: String,
    mimeType: String,
    extractedText: String,
    chunks: [chunkSchema]
  },
  { timestamps: true }
);

export default mongoose.models.Document || mongoose.model('Document', documentSchema);
