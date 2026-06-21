import { TEAMS, GROUPS } from '../data'

function GroupCard({ letter, teamCodes, selection, onToggle }) {
  const sel = selection || {}
  const isComplete = sel['1st'] && sel['2nd'] && sel['3rd']

  return (
    <div className={`group-card ${isComplete ? 'complete' : ''}`}>
      <div className="group-header">
        <span className="group-letter">GROUP {letter}</span>
        <span className="group-status">{isComplete ? '✓ Complete' : 'Select 1st, 2nd, 3rd'}</span>
      </div>
      <div className="group-teams">
        {teamCodes.map(code => {
          const team = TEAMS[code]
          let selectedClass = ''
          let badge = ''

          if (sel['1st'] === code) { selectedClass = 'selected-1st'; badge = '1ST' }
          else if (sel['2nd'] === code) { selectedClass = 'selected-2nd'; badge = '2ND' }
          else if (sel['3rd'] === code) { selectedClass = 'selected-3rd'; badge = '3RD' }
          else if (isComplete) { selectedClass = 'eliminated' }

          return (
            <div
              key={code}
              className={`team-row ${selectedClass}`}
              onClick={() => onToggle(letter, code)}
            >
              <span className="team-flag">{team.flag}</span>
              <span className="team-name">{team.name}</span>
              <span className="team-badge">{badge}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function GroupStage({ groupSelections, onToggle, onRandomize, onConfirm, allComplete }) {
  return (
    <section id="groupStage" className="section">
      <div className="section-header">
        <h2 className="section-title">GROUP STAGE</h2>
        <p className="section-subtitle">
          Select 1st, 2nd, and 3rd place for each group. Top 2 qualify automatically.
          Best 8 third-placed teams also advance.
        </p>
      </div>
      <div className="groups-grid">
        {Object.entries(GROUPS).map(([letter, teamCodes]) => (
          <GroupCard
            key={letter}
            letter={letter}
            teamCodes={teamCodes}
            selection={groupSelections[letter]}
            onToggle={onToggle}
          />
        ))}
      </div>
      <div className="action-bar">
        <button className="secondary-btn" onClick={onRandomize}>
          🎲 Randomize All
        </button>
        <button
          className={`cta-btn ${!allComplete ? 'disabled' : ''}`}
          onClick={onConfirm}
          disabled={!allComplete}
        >
          <span>CONFIRM & GENERATE BRACKET</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}
