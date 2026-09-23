/**
 * App shell. Holds the screen switcher, the persistent Ask button, the
 * global safety alert overlay and the demo drawer.
 *
 * CONTRACT
 * - No routing library. `screen` lives in the store; nav is a plain switch.
 * - SafetyAlert renders ABOVE everything and is driven purely by
 *   riskEngine output in the store. It is never triggered by a page.
 * - Ask button is present on every screen. It is not a nav tab.
 *
 * BUILD ORDER: this is Block 1. Stub every page, then fill them in order.
 */
export default function App() {
  // TODO(Block 1): read { screen } from useStore()
  // TODO(Block 1): render <OperatorHeader />, page switch, <BottomNavigation />
  // TODO(Block 4): mount <SafetyAlert /> as a fixed overlay
  // TODO(Block 12): mount <DemoControls /> behind a long-press on the header
  return null
}
