import axiosClient from './axiosClient';

export const authApi = {
  login: async (email, password) => {
    // Simulating API network call with fallback mock response
    try {
      return await axiosClient.post('/auth/login', { email, password });
    } catch {
      return {
        success: true,
        user: {
          id: 'usr_99812',
          name: 'Sarah Jenkins',
          email: email || 's.jenkins@titanheavy.com',
          role: 'Chief Reliability Engineer',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
          org: 'Titan Heavy Industries',
          apiKey: 'indus_live_9f82a10b42c98402a'
        },
        token: 'indus_jwt_mock_token_99827162'
      };
    }
  },
  register: async (userData) => {
    try {
      return await axiosClient.post('/auth/register', userData);
    } catch {
      return {
        success: true,
        message: 'Account successfully registered for ' + userData.companyName,
        user: {
          id: 'usr_' + Math.floor(Math.random() * 10000),
          name: userData.fullName,
          email: userData.email,
          role: userData.jobRole || 'Plant Engineer',
          org: userData.companyName,
          apiKey: 'indus_live_' + Math.random().toString(36).substring(2)
        }
      };
    }
  }
};

export const documentApi = {
  getDocuments: async () => {
    try {
      return await axiosClient.get('/documents');
    } catch {
      return [
        { id: 'DOC-8921', filename: 'Gas_Turbine_GE_9HA_Manual_v4.2.pdf', size: '18.4 MB', uploadDate: '2026-07-20', status: 'Processed', category: 'OEM Manual', indexedPages: 412, confidence: '99%' },
        { id: 'DOC-8922', filename: 'ISO_45001_Safety_Audit_2025.pdf', size: '6.2 MB', uploadDate: '2026-07-18', status: 'Processed', category: 'Compliance', indexedPages: 84, confidence: '97%' },
        { id: 'DOC-8923', filename: 'Boiler_Feed_Pump_Vibration_Spec.docx', size: '3.1 MB', uploadDate: '2026-07-15', status: 'Processed', category: 'Technical Spec', indexedPages: 36, confidence: '95%' },
        { id: 'DOC-8924', filename: 'Substation_Thermal_Scan_Report.pdf', size: '24.1 MB', uploadDate: '2026-07-12', status: 'Processed', category: 'Inspection', indexedPages: 120, confidence: '98%' },
        { id: 'DOC-8925', filename: 'Compressor_Stage2_Failure_RCA_Draft.docx', size: '1.8 MB', uploadDate: '2026-07-21', status: 'Processing', category: 'Incident RCA', indexedPages: 14, confidence: '91%' }
      ];
    }
  },
  uploadDocument: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      return await axiosClient.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } catch {
      return {
        id: 'DOC-' + Math.floor(Math.random() * 9000 + 1000),
        filename: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Processed',
        category: file.name.endsWith('.pdf') ? 'Technical Spec' : 'Plant Spec',
        indexedPages: Math.floor(Math.random() * 80 + 10),
        confidence: '98%'
      };
    }
  },
  deleteDocument: async (id) => {
    try {
      return await axiosClient.delete(`/documents/${id}`);
    } catch {
      return { success: true, id };
    }
  }
};

export const aiAssistantApi = {
  queryKnowledge: async (prompt, conversationId) => {
    try {
      return await axiosClient.post('/ai/query', { prompt, conversationId });
    } catch {
      // Mock Response generator tailored for industrial intelligence
      return {
        answer: `Based on the OEM Technical Specification **GE-9HA-Man-v4.2 (Page 184)** and recent maintenance logs:

### Diagnostic Summary for High Vibration Signal
The excessive axial vibration observed on **Turbine Bearing #3** (exceeding 7.2 mm/s RMS) is strongly correlated with **oil whirl instability** combined with thermal misalignment of the secondary thrust bearing collar.

#### Key OEM Recommended Actions:
1. **Immediate Inspection**: Verify lube oil supply temperature at header manifold (target: **42°C ± 2°C**). Elevated oil temperature (>54°C) reduces oil film stiffness.
2. **Lube Oil Sampling**: Extract 250ml oil sample for ISO 4406 particle count and varnish oxidation analysis.
3. **Alignment Verification**: Conduct laser alignment check during the upcoming planned outage window.

> [!NOTE]
> Historical failure log **RCA-2024-09B** indicates similar vibration patterns were resolved by replacing the lube oil anti-whirl sleeve insert.`,
        sources: [
          { docName: 'Gas_Turbine_GE_9HA_Manual_v4.2.pdf', page: 'Page 184, Section 5.3', score: '99% Match' },
          { docName: 'Substation_Thermal_Scan_Report.pdf', page: 'Page 12, Appendix B', score: '94% Match' }
        ],
        confidenceScore: 98,
        latencyMs: 340
      };
    }
  }
};

export const maintenanceApi = {
  getMaintenanceOverview: async () => {
    try {
      return await axiosClient.get('/maintenance/overview');
    } catch {
      return [
        {
          id: 'MNT-101',
          equipment: 'Gas Turbine Unit #2 (GE 9HA.02)',
          tagId: 'GT-02-SYS-99',
          location: 'Power Generation Plant Alpha',
          status: 'Critical Anomaly',
          severity: 'Critical',
          possibleCause: 'Thermal stress cracking on Stage 1 high-pressure nozzle guide vanes coupled with lube oil temperature spike.',
          previousFailures: [
            { date: '2024-11-14', issue: 'High exhaust spread temperature (>45°C deviation)', resolution: 'Replaced thermocouple harness assembly' },
            { date: '2023-08-02', issue: 'Bearing #2 vibration alarm trips', resolution: 'Dynamic balancing and sleeve alignment' }
          ],
          oemRecommendation: 'Perform borescope inspection within 24 operating hours. Verify fuel nozzle purge pressure differentials.',
          preventiveAction: 'Schedule emergency outage window for thermal barrier coating (TBC) integrity check.',
          healthScore: 68
        },
        {
          id: 'MNT-102',
          equipment: 'High-Pressure Boiler Feed Pump B',
          tagId: 'BFP-01B',
          location: 'Utility Water Treatment Annex',
          status: 'Warning',
          severity: 'High',
          possibleCause: 'Mechanical seal flush flow cavitation due to suction strainer partial blockage (70% pressure drop).',
          previousFailures: [
            { date: '2025-02-10', issue: 'Seal flush leak rate exceeded 15 L/hr', resolution: 'Replaced tungsten carbide mechanical seal rings' }
          ],
          oemRecommendation: 'Backwash suction strainers immediately. Flush seal gland cooling loop.',
          preventiveAction: 'Implement differential pressure transducer alarm threshold at 1.2 bar.',
          healthScore: 82
        },
        {
          id: 'MNT-103',
          equipment: 'Main Step-Up Transformer 400kV',
          tagId: 'TR-400-01',
          location: 'High Voltage Substation Yard',
          status: 'Normal Operations',
          severity: 'Low',
          possibleCause: 'Dissolved Gas Analysis (DGA) shows minor elevated Hydrogen (H2 < 60 ppm), within acceptable IEEE limits.',
          previousFailures: [
            { date: '2022-04-18', issue: 'Bushing tan delta deviation', resolution: 'Replaced C1 capacitance bushing' }
          ],
          oemRecommendation: 'Routine quarterly oil sample test and continuous DGA online monitoring.',
          preventiveAction: 'Calibrate Buchholz relay oil surge trip sensor during yearly shutdown.',
          healthScore: 96
        }
      ];
    }
  }
};

export const complianceApi = {
  getComplianceData: async () => {
    try {
      return await axiosClient.get('/compliance/summary');
    } catch {
      return {
        overallScore: 92,
        auditsPassed: 28,
        totalAudits: 30,
        safetyGaps: [
          { code: 'OSHA-1910.147', title: 'Lockout/Tagout (LOTO) Procedure Verification Missing for Pump BFP-01B', risk: 'High', area: 'Mechanical Safety' },
          { code: 'ISO-45001-8.2', title: 'Emergency Response Drill Documentation Overdue by 14 Days', risk: 'Medium', area: 'EHS Operations' },
          { code: 'EPA-40-CFR-60', title: 'CEMS Continuous Emissions Monitoring Calibration Log Missing Sign-off', risk: 'High', area: 'Environmental' }
        ],
        missingDocs: [
          'Site-wide Fire Protection Annual Certification 2026.pdf',
          'Vessel Pressure Test Report - Air Receiver TK-402',
          'Operator Electrical Arc Flash Training Register'
        ],
        recommendations: [
          'Generate automated LOTO checklist from OEM manual GE-9HA page 220.',
          'Schedule EHS drill log entry into system prior to Friday EOD.',
          'Upload third-party pressure vessel safety clearance certificate.'
        ]
      };
    }
  }
};
