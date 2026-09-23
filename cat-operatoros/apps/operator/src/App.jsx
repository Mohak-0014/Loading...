import { useEffect, useState } from 'react'
import OperatorHeader from './components/OperatorHeader.jsx'
import BottomNavigation from './components/BottomNavigation.jsx'
import Home from './pages/Home.jsx'
import Safety from './pages/Safety.jsx'
import Tasks from './pages/Tasks.jsx'
import Coach from './pages/Coach.jsx'
import Training from './pages/Training.jsx'
import Machine from './pages/Machine.jsx'

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
 *
 * BLOCK 1: `screen` and `contrast` are local state here because
 * state/store.jsx (Block 2) is not built yet. Block 2 replaces both with
 * useStore() — this component should shrink, not grow, when that lands.
 */
const PAGES = {
  home: Home,
  safety: Safety,
  tasks: Tasks,
  coach: Coach,
  training: Training,
  machine: Machine,
}

export default function App() {
  // TODO(Block 2): read { screen } from useStore() instead of local state
  const [screen, setScreen] = useState('home')

  // TODO(Block 2): contrast moves into store.mode.contrast
  const [contrast, setContrast] = useState('normal')

  useEffect(() => {
    if (contrast === 'high') {
      document.documentElement.setAttribute('data-contrast', 'high')
    } else {
      document.documentElement.removeAttribute('data-contrast')
    }
  }, [contrast])

  const Page = PAGES[screen]

  return (
    <div className="flex h-full flex-col bg-steel-900">
      <OperatorHeader
        contrast={contrast}
        onToggleContrast={() => setContrast((c) => (c === 'high' ? 'normal' : 'high'))}
      />
      <main className="flex-1 overflow-y-auto">
        <Page />
      </main>
      <BottomNavigation screen={screen} onNavigate={setScreen} />
      {/* TODO(Block 4): mount <SafetyAlert /> as a fixed overlay */}
      {/* TODO(Block 13): mount <DemoControls /> behind a long-press on the header */}
    </div>
  )
}
