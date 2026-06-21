export default function Hero({ onStart }) {
  return (
    <header className="hero">
      <div className="hero-content">
        <div className="trophy-icon">🏆</div>
        <h1 className="hero-title">
          <span className="title-line">FIFA WORLD CUP</span>
          <span className="title-year">2026</span>
        </h1>
        <p className="hero-subtitle">USA • MEXICO • CANADA</p>
        <p className="hero-desc">
          Build your dream bracket. Pick group winners, simulate the knockout rounds,
          and crown the champion.
        </p>
        <button className="cta-btn" onClick={onStart}>
          <span>START SIMULATION</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="hero-flags">
        <span className="flag-emoji">🇺🇸</span>
        <span className="flag-emoji">🇲🇽</span>
        <span className="flag-emoji">🇨🇦</span>
      </div>
    </header>
  )
}
