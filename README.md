# IndusMind AI – Industrial Knowledge Intelligence Platform

> **ET AI Hackathon 2.0 Entry**  
> *Unified Asset & Operations Brain for Heavy Industry, Utilities, & Manufacturing*

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24.11-339933?logo=nodedotjs)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.9-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini_API-1.5_Flash-8E75B2?logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Executive Overview
IndusMind AI unifies scattered OEM manuals, maintenance work orders, thermal inspection scans, and ISO/OSHA safety standards into a real-time conversational intelligence brain for plant reliability engineers.

---

## 🏗️ System Architecture

```
IndusMind-AI/
├── client/          # React (Vite) + Tailwind CSS Frontend
├── server/          # Node.js + Express + MongoDB + Gemini RAG Backend
├── docs/            # Architecture & API Specifications
├── screenshots/     # UI Previews & Dashboards
├── assets/          # Project Branding & Media
├── architecture/    # RAG Sequence Flow Diagrams
└── demo/            # Hackathon Walkthrough Script
```

---

## ✨ Key Features & Capabilities

### 1. Unified Multi-Format Vector Store
- Ingest PDF manuals, DOCX work orders, PNG/JPG thermal scans via `pdf-parse`, `mammoth`, and `tesseract.js` OCR.
- Automatic sliding-window chunking and embedding storage in ChromaDB / Vector Store.

### 2. Copilot Enterprise AI Assistant (`/app/assistant`)
- Grounded Retrieval-Augmented Generation (RAG) powered by Google Gemini API.
- Live Confidence Score Badges, Citation Cards (Document Name, Page #), and Markdown rendering.

### 3. Maintenance Intelligence & RCA (`/app/maintenance`)
- Equipment diagnostic cards for Gas Turbines, Boiler Feed Pumps, and High-Voltage Transformers.
- Automated Root Cause Analysis (RCA), Historical Failure Resolution Logs, OEM Recommendations, and Preventive Maintenance checklists.

### 4. Regulatory Compliance Checker (`/app/compliance`)
- Instant comparison of Standard Operating Procedures (SOPs) against ISO 45001, ISO 9001, and OSHA Title 29.
- Compliance Percentage progress dials, safety gap lists, missing document warnings, and AI corrective action guidance.

### 5. Executive PDF Report Generator (`/app/reports`)
- Synthesizes Root Cause Analysis, Maintenance Reports, and Compliance Summaries into downloadable executive PDF documents built with `PDFKit`.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v18+ and npm
- MongoDB (Optional: Graceful in-memory fallback enabled for quick local testing)

### 1. Clone & Setup Repository
```bash
git clone https://github.com/KripaShankar7234/IndusMind-AI.git
cd IndusMind-AI
```

### 2. Launch Backend Server
```bash
cd server
npm install --strict-ssl=false
npm start
```
- Server API Endpoint: `http://localhost:5000/api`

### 3. Launch Frontend Client
```bash
cd ../client
npm install --strict-ssl=false
npm run dev
```
- Client App URL: `http://localhost:3000/`

---

## 📝 Milestone Commit Log (ET AI Hackathon 2.0)
1. `Initial React Setup`
2. `Landing Page Completed`
3. `Dashboard UI Completed`
4. `Sidebar Navigation Added`
5. `Authentication UI Added`
6. `Document Upload Module Added`

---

## 📄 License
Licensed under the [MIT License](LICENSE).
