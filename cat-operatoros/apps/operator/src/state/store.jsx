/**
 * The single source of truth. Every screen reads from here; no screen owns
 * state that another screen needs.
 *
 * WHY ONE STORE: the pitch is "everything is connected". A hazard report has
 * to change Hazard Memory, the Coach and the Handover within the same tick.
 * Local component state makes that demo impossible.
 *
 * SHAPE
 * {
 *   screen: 'home' | 'safety' | 'tasks' | 'coach' | 'training' | 'machine'
 *           | 'report' | 'handover',
 *   mode: { glance: boolean, contrast: 'normal' | 'high' },
 *   operator,            // data/operator.js
 *   machine,             // data/machine.js
 *   telemetry,           // current tick, shape per docs/DATA_SCHEMA.md
 *   telemetryHistory,    // rolling window used by anomalyDetector
 *   tasks,               // data/tasks.js, mutated as the shift runs
 *   incidents,           // grows when a hazard is reported
 *   risk,                // riskEngine output, recomputed every tick
 *   anomalies,           // anomalyDetector output
 *   coach,               // coachEngine output
 *   training,            // module list + completion
 *   faultLog,            // fault-symbol lookups, feeds machine + handover
 *   syncQueue,           // items pending "sync" for the offline badge
 * }
 *
 * ACTIONS (keep this list short; every action must be demo-visible)
 *   setScreen, tick, applyDemoScenario, reportHazard, completeTask,
 *   acknowledgeRisk, completeTraining, logFault, toggleGlance, toggleContrast
 *
 * PERSISTENCE: mirror to localStorage via services/persistence.js on every
 * change. Hydrate on boot. See the quota warning in that file.
 */
export function StoreProvider({ children }) {
  // TODO(Block 2): useReducer + Context. No external state library.
  return children
}

export function useStore() {
  // TODO(Block 2)
}
