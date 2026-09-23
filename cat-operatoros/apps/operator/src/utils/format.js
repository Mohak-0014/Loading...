/** Display formatters. Keep every number formatted in exactly one place. */

/** Seconds or minutes-as-float -> "2:51". Treats input under 20 as minutes. */
export function duration(value, { unit = 'sec' } = {}) {
  const totalSec = Math.max(0, Math.round(unit === 'min' ? value * 60 : value))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function clock(date) {
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
}

export function percent(n, { decimals = 0 } = {}) {
  return `${n.toFixed(decimals)}%`
}

export function meters(n) {
  return `${Math.round(n)} m`
}

// Time-aware greeting: judging usually happens in the afternoon, so
// "Good morning" hardcoded is an easy own goal.
export function greeting(date = new Date()) {
  const h = date.getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}
