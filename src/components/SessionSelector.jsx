import './SessionSelector.css';
import { useTimer } from '../hooks/useTimer';

export default function SessionSelector() {
  const { timer, switchSession } = useTimer();

  const sessions = [
    { type: 'work', label: 'Work', icon: '💼' },
    { type: 'shortBreak', label: 'Short Break', icon: '☕' },
    { type: 'longBreak', label: 'Long Break', icon: '🌴' },
  ];

  const handleSessionChange = (sessionType) => {
    if (!timer.isRunning && !timer.isPaused) {
      switchSession(sessionType);
    }
  };

  return (
    <div className="session-selector" role="tablist" aria-label="Session type">
      {sessions.map((session) => (
        <button
          key={session.type}
          className={`session-btn ${timer.sessionType === session.type ? 'active' : ''} ${
            timer.isRunning || timer.isPaused ? 'disabled' : ''
          }`}
          onClick={() => handleSessionChange(session.type)}
          disabled={timer.isRunning || timer.isPaused}
          role="tab"
          aria-selected={timer.sessionType === session.type}
          aria-label={session.label}
        >
          <span className="session-icon">{session.icon}</span>
          <span className="session-label">{session.label}</span>
        </button>
      ))}
    </div>
  );
}
