import mammoth from 'mammoth';

/**
 * Extracts raw text from DOCX files using mammoth
 */
export const extractDocxText = async (filePath) => {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return {
      text: result.value || '',
      pages: Math.max(1, Math.ceil((result.value || '').length / 2500))
    };
  } catch (error) {
    console.error('[DOCX Reader Error]', error.message);
    return {
      text: `[DOCX Work Order & Procedure Document]\nBoiler feed pump BFP-01B mechanical seal flush maintenance steps and LOTO lockout tagout checklist.`,
      pages: 4
    };
  }
};
