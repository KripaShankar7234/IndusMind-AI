/**
 * Splitting utility for industrial document ingestion
 * @param {string} fullText - The extracted text
 * @param {number} chunkSize - Number of characters per chunk (default 800)
 * @param {number} overlap - Overlapping character count (default 150)
 */
export const chunkText = (fullText, chunkSize = 800, overlap = 150) => {
  if (!fullText) return [];

  const chunks = [];
  let startIndex = 0;
  let pageCounter = 1;

  while (startIndex < fullText.length) {
    const endIndex = Math.min(startIndex + chunkSize, fullText.length);
    const chunkContent = fullText.slice(startIndex, endIndex).trim();

    if (chunkContent.length > 20) {
      chunks.push({
        chunkId: `chunk-${Date.now()}-${chunks.length + 1}`,
        text: chunkContent,
        pageNumber: pageCounter
      });
    }

    // Estimate page transition roughly every 2000 chars
    if (startIndex > 0 && startIndex % 2000 === 0) {
      pageCounter++;
    }

    startIndex += chunkSize - overlap;
  }

  return chunks;
};
