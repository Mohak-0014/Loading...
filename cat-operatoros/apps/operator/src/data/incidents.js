/**
 * Historical incidents. This is what makes Hazard Memory work — the site
 * knows things before the operator arrives.
 *
 * Cluster at least 3 vehicle-proximity events in Zone C dated this week.
 * That cluster is the moment the differentiator lands in the demo.
 *
 * Zones: A (clear), B (active work), C (repeat hazard).
 */
export const ZONES = [
  { id: 'A', label: 'Zone A', risk: 'low', polygon: [] },
  { id: 'B', label: 'Zone B', risk: 'medium', polygon: [] },
  { id: 'C', label: 'Zone C', risk: 'high', polygon: [] },
]

export const INCIDENTS = [
  // { id, zone, type, severity, timestamp, machineId, operatorId,
  //   task, telemetrySnapshot, photos: [] }
  // TODO(Block 2)
]
