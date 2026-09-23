/**
 * Primary demo operator plus the PERSONAL BASELINE the Coach compares
 * against. The baseline is the whole point: never rank operators against
 * each other, only against their own history.
 */
export const OPERATOR = {
  id: 'OP1001',
  name: 'Operator',
  shift: { start: '08:00', end: '17:00' },
  baseline: {
    cycleTimeSec: 162, // 2:42
    idlePercent: 8,
    fuelPerCycleL: 4.8,
    seatbeltCompliancePercent: 97,
  },
}
