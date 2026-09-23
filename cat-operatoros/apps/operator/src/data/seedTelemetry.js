/**
 * Seed telemetry.
 *
 * NON-NEGOTIABLE: the first four records are the judges' own sample rows,
 * verbatim. Everything after is synthetic. See docs/DATA_SCHEMA.md.
 *
 * Generate ~200 synthetic records covering, at minimum:
 *   - normal operation (baseline cycles)
 *   - an inefficient stretch (idle climbing, cycle time drifting)
 *   - proximity events clustered in Zone C
 *   - two seatbelt violations
 *   - a range of task durations for the ETA model to learn from
 *
 * The ETA model trains on these rows at boot, so they need real variance.
 * Flat synthetic data produces a model with zero explanatory power and the
 * contributor breakdown will look fake.
 */
export const JUDGE_SAMPLE_ROWS = [
  { timestamp: '2025-05-01T08:00:00', machineId: 'EXC001', operatorId: 'OP1001', engineHours: 1523.5, fuelUsedL: 5.2, loadCycles: 12, idlingTimeMin: 30, seatbelt: 'Fastened',   safetyAlert: false },
  { timestamp: '2025-05-01T10:00:00', machineId: 'EXC001', operatorId: 'OP1001', engineHours: 1524.8, fuelUsedL: 3.8, loadCycles: 2,  idlingTimeMin: 55, seatbelt: 'Unfastened', safetyAlert: true  },
  { timestamp: '2025-05-01T14:00:00', machineId: 'EXC001', operatorId: 'OP1001', engineHours: 1526.5, fuelUsedL: 6.1, loadCycles: 10, idlingTimeMin: 15, seatbelt: 'Fastened',   safetyAlert: false },
  { timestamp: '2025-05-02T09:00:00', machineId: 'EXC001', operatorId: 'OP1001', engineHours: 1530.2, fuelUsedL: 2.0, loadCycles: 1,  idlingTimeMin: 60, seatbelt: 'Unfastened', safetyAlert: true  },
]

// TODO(Block 2): export const SEED_TELEMETRY = [...JUDGE_SAMPLE_ROWS, ...synthetic]
