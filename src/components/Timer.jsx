import './Timer.css';
import { useTimer } from '../hooks/useTimer';

export default function Timer() {
  const {
    timer,
    formatTime,
    getProgress,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
  } = useTimer();

  const progress = getProgress();
  const circumference = 2 * Math.PI * 140; // radius of 140
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handleStartPause = () => {
    if (timer.isRunning) {
      pauseTimer();
    } else if (timer.isPaused) {
      resumeTimer();
    } else {
      startTimer();
    }
  };

  const getButtonText = () => {
    if (timer.isRunning) return 'Pause';
    if (timer.isPaused) return 'Resume';
    return 'Start';
  };

  return (
    <div className="timer-container">
      <div className="timer-circle">
        <svg className="timer-svg" width="320" height="320">
          {/* Background circle */}
          <circle
            className="timer-circle-bg"
            cx="160"
            cy="160"
            r="140"
            fill="none"
            stroke="var(--surface)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            className={`timer-circle-progress ${timer.isRunning ? 'pulsing' : ''}`}
            cx="160"
            cy="160"
            r="140"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 160 160)"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--session-gradient-start)" />
              <stop offset="100%" stopColor="var(--session-gradient-end)" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="timer-content">
          <div className="timer-display" role="timer" aria-live="polite">
            {formatTime(timer.currentTime)}
          </div>
        </div>
      </div>

      <div className="timer-controls">
        <button
          className="btn btn-primary"
          onClick={handleStartPause}
          aria-label={getButtonText()}
        >
          {getButtonText()}
        </button>
        
        {(timer.isRunning || timer.isPaused) && (
          <button
            className="btn btn-secondary"
            onClick={stopTimer}
            aria-label="Stop timer"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
