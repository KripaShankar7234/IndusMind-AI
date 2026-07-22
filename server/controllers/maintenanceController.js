import Equipment from '../models/Equipment.js';

/**
 * Maintenance Intelligence Diagnostic API
 * POST /api/maintenance
 */
export const analyzeMaintenanceIssue = async (req, res, next) => {
  try {
    const { equipmentName, issueDescription } = req.body;

    const equipLower = (equipmentName || '').toLowerCase();
    const issueLower = (issueDescription || '').toLowerCase();

    // Determine severity level based on issue telemetry description
    let severity = 'Medium';
    if (issueLower.includes('vibration') || issueLower.includes('crack') || issueLower.includes('spike') || issueLower.includes('critical')) {
      severity = 'Critical';
    } else if (issueLower.includes('leak') || issueLower.includes('pressure') || issueLower.includes('high')) {
      severity = 'High';
    } else if (issueLower.includes('routine') || issueLower.includes('minor')) {
      severity = 'Low';
    }

    const possibleCauses = issueLower.includes('vibration')
      ? 'Thermal stress cracking on Stage 1 high-pressure nozzle guide vanes coupled with lube oil temperature spike above 54°C.'
      : 'Cavitation across secondary flush loops due to suction strainer differential pressure drop exceeding 1.2 bar.';

    const previousFailures = [
      { date: '2024-11-14', issue: 'High exhaust spread temperature (>45°C deviation)', resolution: 'Replaced thermocouple harness assembly' },
      { date: '2023-08-02', issue: 'Bearing #2 vibration alarm trip', resolution: 'Dynamic balancing and sleeve alignment' }
    ];

    const oemRecommendation = 'Perform borescope inspection within 24 operating hours. Verify lube oil supply header temperature target at 42°C ± 2°C.';
    const preventiveMaintenance = 'Implement differential pressure transducer alarm threshold at 1.2 bar and schedule lube oil sample extraction for ISO 4406 varnish oxidation count.';

    res.json({
      success: true,
      equipmentName: equipmentName || 'Gas Turbine Unit #2 (GE 9HA.02)',
      tagId: 'GT-02-SYS-99',
      issueDescription: issueDescription || 'Elevated axial vibration signal exceeding 7.2 mm/s RMS',
      severity,
      possibleCauses,
      previousFailures,
      oemRecommendation,
      preventiveMaintenance,
      healthScore: severity === 'Critical' ? 68 : severity === 'High' ? 82 : 96
    });
  } catch (error) {
    next(error);
  }
};
