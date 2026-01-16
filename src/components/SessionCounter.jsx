import './SessionCounter.css';
import { useTimer } from '../hooks/useTimer';

export default function SessionCounter() {
  const { sessions } = useTimer();

  return (
    <div className="session-counter" role="status" aria-label="Completed work sessions">
      <div className="counter-icon">🎯</div>
      <div className="counter-info">
        <div className="counter-label">Sessions Completed</div>
        <div className="counter-value">{sessions.completedWorkSessions}</div>
      </div>
    </div>
  );
}
