const STEPS = [
  { num: 1, label: 'Groups' },
  { num: 2, label: 'Round of 32' },
  { num: 3, label: 'Round of 16' },
  { num: 4, label: 'Quarter Finals' },
  { num: 5, label: 'Semi Finals' },
  { num: 6, label: 'Final' },
]

export default function ProgressBar({ currentStep }) {
  return (
    <div className="progress-bar">
      <div className="progress-steps">
        {STEPS.map((step, i) => {
          const cls = step.num === currentStep ? 'active' : step.num < currentStep ? 'completed' : ''
          return (
            <div key={step.num} style={{ display: 'contents' }}>
              <div className={`step ${cls}`}>
                <div className="step-circle">{step.num}</div>
                <span>{step.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className="step-line" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
