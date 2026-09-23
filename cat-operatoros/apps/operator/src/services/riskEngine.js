/**
 * CONTEXTUAL RISK ENGINE — the core intelligence claim of the product.
 *
 * The differentiator is FUSION. Do not emit one alert per threshold breach.
 * Combine load, slope, proximity, speed and seatbelt into ONE verdict with
 * ONE recommended action.
 *
 *   assessRisk(telemetry, context) -> {
 *     state: 'safe' | 'attention' | 'high' | 'critical',
 *     headline,        // plain language, what is happening. No jargon.
 *     factors: [{ label, detail, weight }],   // powers "Why am I seeing this"
 *     action,          // one instruction, imperative voice
 *     requiresAck: boolean,
 *   }
 *
 * RULES
 * - Seatbelt unfastened while the machine is moving is always CRITICAL.
 *   It is 1 of only 9 columns in the judges' schema and both Unfastened rows
 *   in their sample have safetyAlert = true. Treat it as first-class.
 * - Never surface a number without meaning. "Vehicle at 12 m" is fine;
 *   "proximity threshold violation" is not.
 * - Exactly one action. Two actions is an operator deciding while operating.
 * - Pure function. No React, no store import, no side effects. It is called
 *   on every tick and must be cheap.
 */
export function assessRisk(telemetry, context) {
  // TODO(Block 2)
}
