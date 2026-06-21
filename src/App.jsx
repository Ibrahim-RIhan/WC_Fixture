import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TEAMS, GROUPS, FEEDS_MAP, BRACKET_COLUMNS, R32_IDS, R16_IDS, QF_IDS, SF_IDS } from './data'
import Hero from './components/Hero'
import ProgressBar from './components/ProgressBar'
import GroupStage from './components/GroupStage'
import KnockoutStage from './components/KnockoutStage'
import WinnerCelebration from './components/WinnerCelebration'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [view, setView] = useState('groups') // 'groups' | 'knockout' | 'winner'
  const [groupSelections, setGroupSelections] = useState({})
  const [bracketMatches, setBracketMatches] = useState({})
  const [champion, setChampion] = useState(null)
  const knockoutRef = useRef(null)

  const toggleTeamSelection = useCallback((group, code) => {
    setGroupSelections(prev => {
      const sel = { ...(prev[group] || {}) }
      for (const pos of ['1st', '2nd', '3rd']) {
        if (sel[pos] === code) {
          delete sel[pos]
          return { ...prev, [group]: sel }
        }
      }
      if (!sel['1st']) sel['1st'] = code
      else if (!sel['2nd']) sel['2nd'] = code
      else if (!sel['3rd']) sel['3rd'] = code
      return { ...prev, [group]: sel }
    })
  }, [])

  const randomizeGroups = useCallback(() => {
    const newSelections = {}
    Object.entries(GROUPS).forEach(([letter, teamCodes]) => {
      const shuffled = [...teamCodes].sort(() => Math.random() - 0.5)
      newSelections[letter] = { '1st': shuffled[0], '2nd': shuffled[1], '3rd': shuffled[2] }
    })
    setGroupSelections(newSelections)
  }, [])

  const allGroupsComplete = Object.keys(GROUPS).every(
    g => groupSelections[g]?.['1st'] && groupSelections[g]?.['2nd'] && groupSelections[g]?.['3rd']
  )

  const createR32Matchups = (winners, runnersUp, advancingThird) => {
    const matchups = []
    const thirdCopy = [...advancingThird]

    for (let i = 0; i < Math.min(8, winners.length); i++) {
      const w = winners[i]
      let pairIdx = thirdCopy.findIndex(t => t.group !== w.group)
      if (pairIdx === -1) pairIdx = 0
      const pair = thirdCopy.splice(pairIdx, 1)[0]
      matchups.push([w.code, pair.code])
    }

    const runnersUpCopy = [...runnersUp]
    for (let i = 8; i < winners.length; i++) {
      const w = winners[i]
      let pairIdx = runnersUpCopy.findIndex(r => r.group !== w.group)
      if (pairIdx === -1) pairIdx = 0
      const pair = runnersUpCopy.splice(pairIdx, 1)[0]
      matchups.push([w.code, pair.code])
    }

    while (runnersUpCopy.length >= 2) {
      const t1 = runnersUpCopy.shift()
      let pairIdx = runnersUpCopy.findIndex(r => r.group !== t1.group)
      if (pairIdx === -1) pairIdx = 0
      const t2 = runnersUpCopy.splice(pairIdx, 1)[0]
      matchups.push([t1.code, t2.code])
    }

    return matchups
  }

  const confirmGroups = useCallback(() => {
    if (!allGroupsComplete) return

    const winners = [], runnersUp = [], thirdPlace = []
    Object.entries(GROUPS).forEach(([letter]) => {
      winners.push({ code: groupSelections[letter]['1st'], group: letter })
      runnersUp.push({ code: groupSelections[letter]['2nd'], group: letter })
      thirdPlace.push({ code: groupSelections[letter]['3rd'], group: letter })
    })

    const shuffledThird = [...thirdPlace].sort(() => Math.random() - 0.5)
    const advancingThird = shuffledThird.slice(0, 8)
    const r32 = createR32Matchups(winners, runnersUp, advancingThird)

    const matches = {}
    R32_IDS.forEach((id, i) => {
      matches[id] = { teams: [r32[i][0], r32[i][1]], winner: null, scores: null, matchNum: 49 + i }
    })
    ;[...R16_IDS, ...QF_IDS, ...SF_IDS, 'FINAL'].forEach(id => {
      matches[id] = { teams: [null, null], winner: null, scores: null }
    })

    setBracketMatches(matches)
    setView('knockout')
    setCurrentStep(2)
    setTimeout(() => knockoutRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }, [allGroupsComplete, groupSelections])

  const genScores = () => {
    const s1 = Math.random() < 0.15 ? 0 : Math.floor(Math.random() * 4)
    const s2 = Math.random() < 0.15 ? 0 : Math.floor(Math.random() * 4)
    return [s1, s2]
  }

  const clearDownstream = (matches, matchId) => {
    const m = matches[matchId]
    if (!m) return
    m.winner = null
    m.scores = null
    const target = FEEDS_MAP[matchId]
    if (target) {
      const [nextId, slot] = target
      if (matches[nextId]) {
        matches[nextId].teams[slot] = null
        clearDownstream(matches, nextId)
      }
    }
  }

  const selectKnockoutWinner = useCallback((matchId, winnerCode) => {
    setBracketMatches(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      const match = next[matchId]
      if (!match.teams[0] || !match.teams[1]) return prev

      const [s1, s2] = genScores()
      const wIdx = match.teams.indexOf(winnerCode)
      const lIdx = wIdx === 0 ? 1 : 0
      match.scores = [0, 0]
      match.scores[wIdx] = Math.max(s1, s2)
      match.scores[lIdx] = Math.min(s1, s2)
      match.winner = winnerCode

      const target = FEEDS_MAP[matchId]
      if (target) {
        const [nextId, slot] = target
        if (next[nextId].teams[slot] !== winnerCode) {
          clearDownstream(next, nextId)
        }
        next[nextId].teams[slot] = winnerCode
      }

      const r32Done = R32_IDS.every(id => next[id].winner)
      const r16Done = R16_IDS.every(id => next[id].winner)
      const qfDone = QF_IDS.every(id => next[id].winner)
      const sfDone = SF_IDS.every(id => next[id].winner)

      if (next['FINAL']?.winner) {
        setCurrentStep(6)
        setTimeout(() => {
          setChampion(next['FINAL'].winner)
          setView('winner')
        }, 500)
      } else if (sfDone) setCurrentStep(6)
      else if (qfDone) setCurrentStep(5)
      else if (r16Done) setCurrentStep(4)
      else if (r32Done) setCurrentStep(3)
      else setCurrentStep(2)

      return next
    })
  }, [])

  const simulateAll = useCallback(async () => {
    const allRounds = [R32_IDS, R16_IDS, QF_IDS, SF_IDS, ['FINAL']]
    let current = JSON.parse(JSON.stringify(bracketMatches))

    for (const round of allRounds) {
      for (const matchId of round) {
        const m = current[matchId]
        if (m.winner || !m.teams[0] || !m.teams[1]) continue
        const wIdx = Math.random() < 0.5 ? 0 : 1
        const winnerCode = m.teams[wIdx]

        await new Promise(resolve => {
          setTimeout(() => {
            selectKnockoutWinner(matchId, winnerCode)
            resolve()
          }, 180)
        })

        const [s1, s2] = genScores()
        const lIdx = wIdx === 0 ? 1 : 0
        m.scores = [0, 0]
        m.scores[wIdx] = Math.max(s1, s2)
        m.scores[lIdx] = Math.min(s1, s2)
        m.winner = winnerCode

        const target = FEEDS_MAP[matchId]
        if (target) {
          const [nextId, slot] = target
          current[nextId].teams[slot] = winnerCode
        }
      }
    }
  }, [bracketMatches, selectKnockoutWinner])

  const resetToGroups = () => {
    setView('groups')
    setBracketMatches({})
    setCurrentStep(1)
  }

  const resetAll = () => {
    setGroupSelections({})
    setBracketMatches({})
    setChampion(null)
    setView('groups')
    setCurrentStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  }

  return (
    <div className="app">
      <div className="bg-animation">
        {[...Array(12)].map((_, i) => <div key={i} className="particle" style={{ '--i': i }} />)}
      </div>

      <Hero onStart={() => document.getElementById('groupStage')?.scrollIntoView({ behavior: 'smooth' })} />
      <ProgressBar currentStep={currentStep} />

      <AnimatePresence mode="wait">
        {view === 'groups' && (
          <motion.div key="groups" initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.5 }}>
            <GroupStage
              groupSelections={groupSelections}
              onToggle={toggleTeamSelection}
              onRandomize={randomizeGroups}
              onConfirm={confirmGroups}
              allComplete={allGroupsComplete}
            />
          </motion.div>
        )}

        {view === 'knockout' && (
          <motion.div key="knockout" initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.5 }} ref={knockoutRef}>
            <KnockoutStage
              bracketMatches={bracketMatches}
              onSelectWinner={selectKnockoutWinner}
              onSimulateAll={simulateAll}
              onBack={resetToGroups}
            />
          </motion.div>
        )}

        {view === 'winner' && champion && (
          <motion.div key="winner" initial="initial" animate="in" exit="out" variants={pageVariants} transition={{ duration: 0.5 }}>
            <WinnerCelebration team={TEAMS[champion]} onReset={resetAll} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
