import { createContext, useContext, useMemo, useReducer } from 'react'
import { OPERATOR } from '../data/operator.js'
import { MACHINE } from '../data/machine.js'
import { SEED_TELEMETRY } from '../data/seedTelemetry.js'
import { TASKS } from '../data/tasks.js'
import { INCIDENTS } from '../data/incidents.js'
import { TRAINING_MODULES } from '../data/trainingModules.js'
import { assessRisk } from '../services/riskEngine.js'
import { detectAnomalies } from '../services/anomalyDetector.js'
import { buildCoaching } from '../services/coachEngine.js'
import { trainModel, predict } from '../services/etaModel.js'
import { useTelemetryClock, walkTelemetry } from '../hooks/useTelemetryClock.js'

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
 *   mode: { glance: boolean, contrast: 'normal' | 'high', demoRunning: boolean },
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
 * change. Hydrate on boot. See the quota warning in that file. (Block 13 —
 * not wired here; this store works standalone in the meantime.)
 */

// Recent window used to compute "today's" coaching numbers in Phase 0,
// where there is no real shift boundary yet.
//
// Deliberately NOT the chronological tail of SEED_TELEMETRY: the last 8
// rows sit in the proximity-cluster week, which reads as ordinary
// operation on idle/cycle/fuel, so the Coach would boot with "nothing
// stands out" — a silent Coach mid-demo is a dead beat (see
// docs/DEMO_SCRIPT.md's Coach note). Pointing at the tail of the
// inefficient stretch instead — the part of the dataset built to have a
// real, non-trivial idle/cycle signal — means the very first thing Coach
// computes always has something honest to show.
const RECENT_WINDOW = 8
const INEFFICIENT_STRETCH_END = 156 // exclusive; see seedTelemetry.js

function nowStamp() {
  return new Date().toISOString().slice(0, 19)
}

export function buildInitialState() {
  const etaModel = trainModel(SEED_TELEMETRY)

  const tasks = TASKS.map((task) => {
    const prediction = predict(etaModel, task)
    return { ...task, predictedMin: prediction.pointMin, prediction }
  })

  const recentHistory = SEED_TELEMETRY.slice(INEFFICIENT_STRETCH_END - RECENT_WINDOW, INEFFICIENT_STRETCH_END)
  const anomalies = detectAnomalies(SEED_TELEMETRY, OPERATOR.baseline)
  const coach = buildCoaching(recentHistory, OPERATOR.baseline, anomalies)

  const telemetry = SEED_TELEMETRY[SEED_TELEMETRY.length - 1]
  const risk = assessRisk(telemetry, {})

  return {
    screen: 'home',
    mode: { glance: false, contrast: 'normal', demoRunning: false },
    operator: OPERATOR,
    machine: MACHINE,
    telemetry,
    telemetryHistory: SEED_TELEMETRY,
    tasks,
    incidents: INCIDENTS,
    risk,
    anomalies,
    coach,
    training: TRAINING_MODULES.map((m) => ({ ...m, completed: false })),
    faultLog: [],
    syncQueue: [],
    _etaModel: etaModel, // kept to re-predict if a task's features change; never rendered
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case 'setScreen':
      return { ...state, screen: action.screen }

    case 'tick': {
      const telemetry = walkTelemetry(state.telemetry)
      return { ...state, telemetry, risk: assessRisk(telemetry, {}) }
    }

    // Block 13 owns the actual scenario content; this just applies whatever
    // patch it is given and pauses the ambient random walk while it runs.
    case 'applyDemoScenario': {
      const telemetry = { ...state.telemetry, ...action.patch }
      return {
        ...state,
        telemetry,
        risk: assessRisk(telemetry, {}),
        mode: { ...state.mode, demoRunning: true },
      }
    }

    case 'endDemoScenario':
      return { ...state, mode: { ...state.mode, demoRunning: false } }

    case 'reportHazard': {
      const activeTask = state.tasks.find((t) => t.status === 'active')
      const incident = {
        id: `inc-${Date.now()}`,
        zone: action.zone,
        type: action.hazardType,
        severity: action.severity ?? 'medium',
        timestamp: nowStamp(),
        machineId: state.machine.id,
        operatorId: state.operator.id,
        task: activeTask ? activeTask.type : null,
        telemetrySnapshot: state.telemetry,
        photos: action.photos ?? [],
      }
      return { ...state, incidents: [incident, ...state.incidents] }
    }

    case 'completeTask': {
      const tasks = state.tasks.map((t) =>
        t.id === action.taskId ? { ...t, status: 'done', cycles: { ...t.cycles, done: t.cycles.total } } : t,
      )
      return { ...state, tasks }
    }

    case 'acknowledgeRisk':
      return { ...state, risk: { ...state.risk, requiresAck: false, alertAcknowledgedAt: nowStamp() } }

    case 'completeTraining': {
      const training = state.training.map((m) => (m.id === action.moduleId ? { ...m, completed: true } : m))
      return { ...state, training }
    }

    case 'logFault': {
      const entry = { id: `fault-${Date.now()}`, symbolId: action.symbolId, timestamp: nowStamp() }
      return { ...state, faultLog: [entry, ...state.faultLog] }
    }

    case 'toggleGlance':
      return { ...state, mode: { ...state.mode, glance: !state.mode.glance } }

    case 'toggleContrast':
      return { ...state, mode: { ...state.mode, contrast: state.mode.contrast === 'high' ? 'normal' : 'high' } }

    default:
      return state
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState)

  useTelemetryClock(() => dispatch({ type: 'tick' }), { paused: state.mode.demoRunning })

  const actions = useMemo(
    () => ({
      setScreen: (screen) => dispatch({ type: 'setScreen', screen }),
      tick: () => dispatch({ type: 'tick' }),
      applyDemoScenario: (patch) => dispatch({ type: 'applyDemoScenario', patch }),
      endDemoScenario: () => dispatch({ type: 'endDemoScenario' }),
      reportHazard: (hazard) => dispatch({ type: 'reportHazard', ...hazard }),
      completeTask: (taskId) => dispatch({ type: 'completeTask', taskId }),
      acknowledgeRisk: () => dispatch({ type: 'acknowledgeRisk' }),
      completeTraining: (moduleId) => dispatch({ type: 'completeTraining', moduleId }),
      logFault: (symbolId) => dispatch({ type: 'logFault', symbolId }),
      toggleGlance: () => dispatch({ type: 'toggleGlance' }),
      toggleContrast: () => dispatch({ type: 'toggleContrast' }),
    }),
    [],
  )

  const value = useMemo(() => ({ state, ...actions }), [state, actions])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within a StoreProvider')
  return ctx
}
