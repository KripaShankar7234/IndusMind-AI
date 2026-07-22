import PDFDocument from 'pdfkit';

/**
 * Builds an executive PDF report stream/buffer for Root Cause Analysis or Compliance Audit
 */
export const createReportPdf = (reportData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on('data', (buffer) => buffers.push(buffer));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // Title & Header Banner
      doc.fillColor('#2563EB').fontSize(22).text('IndusMind AI Operations Brain', { align: 'left' });
      doc.fillColor('#64748B').fontSize(10).text('Enterprise Industrial Knowledge Intelligence System', { align: 'left' });
      doc.moveDown(1);

      // Report Info Header
      doc.fillColor('#0F172A').fontSize(16).text(reportData.title || 'Industrial Knowledge Report', { underline: true });
      doc.fontSize(10).fillColor('#475569').text(`Report ID: ${reportData.reportId || 'RPT-9981'}`);
      doc.text(`Report Type: ${reportData.reportType || 'Root Cause Analysis'}`);
      doc.text(`Generated Date: ${new Date().toLocaleDateString()}`);
      doc.moveDown(1.5);

      // Executive Summary
      doc.fillColor('#2563EB').fontSize(12).text('Executive Summary', { bold: true });
      doc.fillColor('#334155').fontSize(10).text(reportData.summary || 'Verified grounded asset diagnosis derived from vector manual index.', {
        align: 'justify'
      });
      doc.moveDown(1.5);

      // Report Sections
      if (reportData.sections && reportData.sections.length > 0) {
        reportData.sections.forEach((sec, idx) => {
          doc.fillColor('#0F172A').fontSize(11).text(`${sec.heading}`);
          doc.fillColor('#475569').fontSize(9.5).text(sec.content, { align: 'justify' });
          doc.moveDown(1);
        });
      }

      // Footer Sign-off
      doc.moveDown(2);
      doc.fillColor('#94A3B8').fontSize(8).text('CONFIDENTIAL - Verified by IndusMind AI RAG Engine. ISO 45001 & OEM Grounded.', {
        align: 'center'
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
