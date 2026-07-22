# IndusMind AI System Architecture & RAG Pipeline

This document details the architectural design, vector retrieval pipeline, and data flow of **IndusMind AI**.

## High Level Data Flow

```
[User Document Upload] (PDF / DOCX / Image)
        │
        ▼
[Multer Upload Handler] ───► [MongoDB Metadata Record]
        │
        ▼
[Extractor Router]
 ├── PDF ────────► pdf-parse
 ├── DOCX ───────► mammoth
 └── Image ──────► tesseract.js OCR
        │
        ▼
[Sliding-Window Text Chunker] (800 chars / 150 overlap)
        │
        ▼
[ChromaDB / Vector Store Indexing]
        │
        ▼
[User Query RAG Pipeline] ───► [Top-K Semantic Vector Match] ───► [Google Gemini API] ───► [Grounded Answer + Citations]
```

## Security & Compliance Model
- **Encryption**: AES-256 at rest, TLS 1.3 in transit.
- **Privacy Guarantee**: Zero model retraining on customer proprietary OEM documentation.
