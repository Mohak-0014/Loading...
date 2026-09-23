/** Display formatters. Keep every number formatted in exactly one place. */
// TODO(Block 2): duration(sec) -> "2:51", clock(date), percent(n), meters(n)
// Time-aware greeting: judging usually happens in the afternoon, so
// "Good morning" hardcoded is an easy own goal.
export function greeting(date = new Date()) {
  const h = date.getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}
