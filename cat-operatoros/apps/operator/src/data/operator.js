/**
 * Primary demo operator plus the PERSONAL BASELINE the Coach compares
 * against. The baseline is the whole point: never rank operators against
 * each other, only against their own history.
 *
 * Every field here is checked against seedTelemetry.js's normal-operation
 * subset (everything outside the inefficient stretch and the forced
 * seatbelt violations), the same way fuelPerCycleL and cycleTimeSec's
 * generator centring got checked. idlePercent and seatbeltCompliancePercent
 * were corrected in this pass:
 *   - idlePercent was 8, written before any telemetry existed. The given
 *     sample rows alone (idle 30 min and 15 min on the two Fastened rows)
 *     already rule out 8% under any workable per-record window — even the
 *     most generous reading is well above it. Corrected to 23, matching
 *     both the given rows and the synthetic normal-operation mean.
 *   - seatbeltCompliancePercent was 97 against an actual 98.0
 *     (196 Fastened / 200 total, by construction — 2 given + 2 forced
 *     violations). Corrected to 98.
 *   - cycleTimeSec (162) and fuelPerCycleL (4.8) were already within a few
 *     percent of the generator's normal-operation mean; left as-is.
 *
 * KNOWN DOWNSTREAM CONFLICT: docs/DEMO_SCRIPT.md's Coach beat narrates
 * "Idle 11% against your own normal of 8%" — written for the old, wrong
 * baseline. With idlePercent now 23, that specific pair of numbers no
 * longer makes narrative sense (11% would read as better than normal, not
 * worse). Not fixed here — out of this pass's scope — but it will need
 * reconciling once Block 3+ builds the Coach screen against real numbers.
 */
export const OPERATOR = {
  id: 'OP1001',
  name: 'Operator',
  shift: { start: '08:00', end: '17:00' },
  baseline: {
    cycleTimeSec: 162, // 2:42
    idlePercent: 23,
    fuelPerCycleL: 4.8,
    seatbeltCompliancePercent: 98,
  },
}
