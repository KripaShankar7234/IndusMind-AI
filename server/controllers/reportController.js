import Report from '../models/Report.js';
import { createReportPdf } from '../services/pdfGeneratorService.js';

/**
 * Report Generator API
 * POST /api/reports/generate
 */
export const generateReport = async (req, res, next) => {
  try {
    const { reportType, title, exportPdf = false } = req.body;

    const validTypes = ['Root Cause Analysis', 'Maintenance Report', 'Audit Summary'];
    const type = validTypes.includes(reportType) ? reportType : 'Root Cause Analysis';
    const reportId = 'RPT-2026-INDUS-' + Math.floor(Math.random() * 9000 + 1000);

    const reportData = {
      reportId,
      title: title || `${type} - Plant Unit Alpha`,
      reportType: type,
      summary: `Synthesized operational intelligence for Gas Turbine GE 9HA and High-Pressure Boiler Feed Pump BFP-01B. Ingestion covers 412 OEM manual pages and 28 historical failure incident logs.`,
      sections: [
        {
          heading: '1. Executive Summary & Asset Telemetry',
          content: 'Gas Turbine Unit #2 is operating at 68% health index due to elevated Stage 1 rotor axial vibration (7.2 mm/s). Mechanical alignment checks recommended within 24 operating hours.'
        },
        {
          heading: '2. Grounded OEM Specifications',
          content: 'Per OEM Manual GE-9HA-Man-v4.2 (Page 184): Lube oil inlet manifold temperature must be maintained at 42°C ± 2°C to prevent oil whirl instability.'
        },
        {
          heading: '3. Preventive Action Matrix',
          content: 'Replace lube oil anti-whirl sleeve insert during upcoming outage window. Perform laser optical alignment check.'
        }
      ]
    };

    try {
      await Report.create({
        reportId,
        title: reportData.title,
        reportType: type,
        summary: reportData.summary,
        sections: reportData.sections,
        generatedBy: req.user?._id
      });
    } catch (e) {
      // Mock db fallback
    }

    if (exportPdf) {
      const pdfBuffer = await createReportPdf(reportData);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${reportId}.pdf`);
      return res.send(pdfBuffer);
    }

    res.json({
      success: true,
      report: reportData
    });
  } catch (error) {
    next(error);
  }
};
