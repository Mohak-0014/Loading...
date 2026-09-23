/**
 * PERSONAL MICRO-COACH.
 *
 *   buildCoaching(history, baseline, anomalies) -> {
 *     metrics: [{ label, today, normal, direction }],
 *     oneThing: { text, estimatedImpact, linkedModuleId },
 *   }
 *
 * RULES
 * - Compare to the operator's OWN baseline. Never to other operators, never
 *   to a fleet average, never a leaderboard. The spec says do not shame.
 * - Return exactly ONE improvement. Three recommendations is a report; one
 *   is coaching.
 * - `linkedModuleId` is what closes the loop into the Training Hub. Without
 *   it the Coach is a dead end and the "continuous learning" pitch breaks.
 */
export function buildCoaching(history, baseline, anomalies) {
  // TODO(Block 8)
}
