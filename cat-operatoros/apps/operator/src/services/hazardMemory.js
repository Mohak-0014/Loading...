/**
 * HAZARD MEMORY — the signature differentiator. Not in the problem
 * statement, which is exactly why it scores.
 *
 *   summarizeZone(zoneId, incidents) -> {
 *     eventCount, window: 'this week', commonHazard, lastEvent, severityMix
 *   }
 *   shouldWarnOnApproach(zoneId, incidents, telemetry) -> boolean
 *
 * THE LOOP THAT MUST BE DEMONSTRABLE:
 *   incident reported -> stored -> operator approaches zone later ->
 *   contextual warning -> operator responds -> new data sharpens the zone
 *
 * A hazard reported during the demo must change the Zone C card immediately.
 * If the count does not tick from 3 to 4 on screen, the feature reads as
 * static mock data and the differentiator is lost.
 */
export function summarizeZone(zoneId, incidents) {
  // TODO(Block 5)
}

export function shouldWarnOnApproach(zoneId, incidents, telemetry) {
  // TODO(Block 5)
}
