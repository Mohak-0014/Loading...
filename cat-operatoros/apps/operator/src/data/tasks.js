/**
 * Today's schedule. Mutated live by completeTask / demo scenarios.
 * Each task carries the context the ETA model needs as features:
 * taskType (via `type`), slopeDeg, loadClass, travelMeters, weather.
 *
 * `predictedMin` is deliberately not baked in here — it is a model output,
 * not seed data. state/store.jsx attaches it at init by calling
 * etaModel.predict() against each task's own features.
 */
export const TASKS = [
  { id: 'task-1', time: '07:30', type: 'dig', title: 'Trench excavation — Lot 4', zone: 'B', status: 'done', cycles: { done: 14, total: 14 }, estimatedMin: 50, slopeDeg: 3, loadClass: 'medium', travelMeters: 60, weather: 'clear' },
  { id: 'task-2', time: '09:00', type: 'load', title: 'Load haul trucks — Stockpile 2', zone: 'A', status: 'active', cycles: { done: 9, total: 16 }, estimatedMin: 35, slopeDeg: 1, loadClass: 'high', travelMeters: 120, weather: 'clear' },
  { id: 'task-3', time: '11:00', type: 'grade', title: 'Grade access road — North', zone: 'A', status: 'pending', cycles: { done: 0, total: 10 }, estimatedMin: 65, slopeDeg: 4, loadClass: 'light', travelMeters: 200, weather: 'overcast' },
  { id: 'task-4', time: '13:30', type: 'trench', title: 'Utility trench — Zone C perimeter', zone: 'C', status: 'pending', cycles: { done: 0, total: 12 }, estimatedMin: 80, slopeDeg: 6, loadClass: 'medium', travelMeters: 90, weather: 'clear' },
  { id: 'task-5', time: '15:30', type: 'haul', title: 'Haul spoil to disposal', zone: 'B', status: 'pending', cycles: { done: 0, total: 8 }, estimatedMin: 45, slopeDeg: 2, loadClass: 'medium', travelMeters: 260, weather: 'clear' },
]
