import { TEAMS, BRACKET_COLUMNS } from '../data'

function MatchTeam({ matchId, teamCode, isWinner, isLoser, score, onSelect }) {
  const team = teamCode ? TEAMS[teamCode] : null

  if (!team) {
    return (
      <div className="match-team empty">
        <span className="team-flag">⬜</span>
        <span className="team-name">TBD</span>
        <span className="match-score"></span>
      </div>
    )
  }

  return (
    <div
      className={`match-team ${isWinner ? 'winner' : ''} ${isLoser ? 'loser' : ''}`}
      onClick={() => onSelect(matchId, teamCode)}
    >
      <span className="team-flag">{team.flag}</span>
      <span className="team-name">{team.name}</span>
      <span className="match-score">{score ?? ''}</span>
    </div>
  )
}

function BracketMatch({ matchId, match, onSelectWinner }) {
  const isFinal = matchId === 'FINAL'
  const isSF = matchId.startsWith('SF')
  const isQF = matchId.startsWith('QF')

  let headerLabel
  if (isFinal) headerLabel = '🏆 FINAL'
  else if (isSF) headerLabel = 'SEMI FINAL'
  else if (isQF) headerLabel = `QUARTER FINAL`
  else if (matchId.startsWith('R16')) headerLabel = `ROUND OF 16`
  else headerLabel = `MATCH ${match.matchNum || ''}`

  return (
    <div className={`bracket-match ${isFinal ? 'final-match' : ''}`}>
      <div className="match-header">{headerLabel}</div>
      <MatchTeam
        matchId={matchId}
        teamCode={match.teams[0]}
        isWinner={match.winner === match.teams[0] && !!match.teams[0]}
        isLoser={match.winner && match.winner !== match.teams[0] && !!match.teams[0]}
        score={match.scores?.[0]}
        onSelect={onSelectWinner}
      />
      <MatchTeam
        matchId={matchId}
        teamCode={match.teams[1]}
        isWinner={match.winner === match.teams[1] && !!match.teams[1]}
        isLoser={match.winner && match.winner !== match.teams[1] && !!match.teams[1]}
        score={match.scores?.[1]}
        onSelect={onSelectWinner}
      />
    </div>
  )
}

export default function KnockoutStage({ bracketMatches, onSelectWinner, onSimulateAll, onBack }) {
  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">KNOCKOUT STAGE</h2>
        <p className="section-subtitle">Click on a team to advance them to the next round.</p>
      </div>

      <div className="bracket-container">
        <div className="bracket-wrapper">
          <div className="round-labels">
            {BRACKET_COLUMNS.map((col, i) => (
              <div key={i} className="round-label">{col.label}</div>
            ))}
          </div>
          <div className="bracket-content">
            {BRACKET_COLUMNS.map((col, colIdx) => (
              <div key={colIdx} className="bracket-round">
                {col.matches.map(matchId => (
                  <BracketMatch
                    key={matchId}
                    matchId={matchId}
                    match={bracketMatches[matchId]}
                    onSelectWinner={onSelectWinner}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="action-bar">
        <button className="secondary-btn" onClick={onBack}>
          ← Back to Groups
        </button>
        <button className="cta-btn" onClick={onSimulateAll}>
          ⚡ Simulate All Matches
        </button>
      </div>
    </section>
  )
}
