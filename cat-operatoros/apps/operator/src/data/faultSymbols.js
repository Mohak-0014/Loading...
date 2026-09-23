/**
 * Fault / warning symbol reference for the camera lookup on the Machine
 * screen.
 *
 * HONESTY CONSTRAINT: the prototype does NOT classify the photo. The flow is
 * photo -> grid of candidate symbols -> operator taps the match -> plain
 * language meaning + urgency + action. Never claim recognition happened.
 * See docs/AI_GUIDELINES.md, "Do not fake a model".
 *
 * ~12 entries is enough. Use generic ISO-style machine warnings, drawn as
 * inline SVG. Do not copy Caterpillar artwork.
 */
export const FAULT_SYMBOLS = [
  // { id, name, svg, urgency: 'monitor'|'soon'|'stop-now',
  //   meaning, action, canEscalateToService: boolean }
  // TODO(Block 10)
]
