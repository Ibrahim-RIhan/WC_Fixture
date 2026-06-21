import { useEffect, useRef } from 'react'

const CONFETTI_COLORS = ['#f5c518', '#3b82f6', '#ef4444', '#10b981', '#ec4899', '#8b5cf6', '#f97316', '#06b6d4']

export default function WinnerCelebration({ team, onReset }) {
  const containerRef = useRef(null)

  useEffect(() => {
    // Launch confetti
    const container = containerRef.current
    if (!container) return
    container.innerHTML = ''

    for (let i = 0; i < 150; i++) {
      const piece = document.createElement('div')
      piece.className = 'confetti-piece'
      piece.style.left = `${Math.random() * 100}%`
      piece.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
      piece.style.animationDelay = `${Math.random() * 3}s`
      piece.style.animationDuration = `${2 + Math.random() * 3}s`
      piece.style.width = `${6 + Math.random() * 10}px`
      piece.style.height = `${8 + Math.random() * 16}px`
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'
      piece.style.transform = `rotate(${Math.random() * 360}deg)`
      container.appendChild(piece)
    }

    const timer = setTimeout(() => { container.innerHTML = '' }, 7000)
    return () => clearTimeout(timer)
  }, [team])

  return (
    <section className="section">
      <div className="winner-container">
        <div className="confetti-container" ref={containerRef} />
        <div className="trophy-large">🏆</div>
        <h2 className="winner-title">WORLD CHAMPION</h2>
        <div className="winner-team">{team.name}</div>
        <div className="winner-flag">{team.flag}</div>
        <p className="winner-year">FIFA WORLD CUP 2026</p>
        <button className="cta-btn" onClick={onReset} style={{ marginTop: '2rem' }}>
          <span>SIMULATE AGAIN</span>
        </button>
      </div>
    </section>
  )
}
