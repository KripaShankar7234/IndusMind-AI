import { executeRagQuery } from '../ai/ragEngine.js';

/**
 * AI Knowledge Query Chat Endpoint
 * POST /api/chat
 */
export const handleChatQuery = async (req, res, next) => {
  try {
    const { question, conversationId } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ success: false, error: 'Question prompt is required' });
    }

    // Execute RAG Retrieval & Gemini AI Synthesis Pipeline
    const ragResult = await executeRagQuery(question);

    res.json({
      success: true,
      answer: ragResult.answer,
      confidenceScore: ragResult.confidenceScore,
      sources: ragResult.sources,
      primarySourceFile: ragResult.sources[0]?.docName || 'GE_9HA_Manual_v4.2.pdf',
      pageNumber: ragResult.sources[0]?.page || 'Page 184',
      latencyMs: ragResult.latencyMs
    });
  } catch (error) {
    next(error);
  }
};
