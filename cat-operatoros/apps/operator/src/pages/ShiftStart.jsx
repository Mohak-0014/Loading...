/**
 * SHIFT START — the PPE check.
 *
 * Read docs/DATA_GOVERNANCE.md before touching this file. The rules below are
 * product requirements, not preferences.
 *
 * FLOW
 *   1. Notice screen, shown before the first photo of each shift:
 *        "This checks for a helmet, vest and eye protection. The photo stays
 *         on this tablet and is not uploaded. Your supervisor sees whether the
 *         check passed, not the picture. You can skip it."
 *      That last sentence is what gets the product adopted. Do not cut it.
 *   2. Capture -> on-device inference (services/ppeCheck.js)
 *   3. Result: per-item pass/fail, plain language
 *   4. Missing item -> prompt + retake
 *   5. Retake fails -> OVERRIDE, two taps, reason picker, proceed
 *   6. Camera or model unavailable -> skip with reason, logged as unchecked
 *
 * FAIL OPEN. This screen NEVER blocks an operator from starting work. A model
 * that misreads a vest in low light must not be why someone cannot move a
 * machine. That is a new hazard invented by a safety tool.
 *
 * NEVER: upload the full image, run face detection, show another operator's
 * result, or surface this in anything that looks like a score.
 *
 * The photo is discarded from memory after inference. Only a 256px thumbnail
 * is retained, 7 days.
 */
export default function ShiftStart() {
  // TODO
  return null
}
