/**
 * Training Hub content. Three formats, because the problem statement asks
 * for "e-learning videos, instructor booking or simulation module".
 *
 *   scenario   - 30-second decision question (the adaptive one)
 *   video      - poster tile + duration. NO real playback; do not ship a
 *                play button that does nothing, label it as a module card.
 *   instructor - one slot picker, one confirmation screen
 *
 * Every module carries `triggeredBy`: the observed behaviour that caused it
 * to be assigned. A module with no provenance line is a generic e-learning
 * app and scores nothing.
 */
export const TRAINING_MODULES = [
  // { id, format, skill, title, durationSec, triggeredBy, question?, options?,
  //   correctId?, explanation? }
  // TODO(Block 9)
]

export const SKILLS = [
  'Proximity awareness',
  'Fuel efficiency',
  'Safe loading',
  'Slope operation',
  'Smooth operation',
  'Idle reduction',
  'Hazard awareness',
]
