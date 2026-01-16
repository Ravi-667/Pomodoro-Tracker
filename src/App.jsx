import { useEffect } from 'react';
import './App.css';
import { PomodoroProvider } from './context/PomodoroContext';
import { useTimer } from './hooks/useTimer';
import Timer from './components/Timer';
import SessionSelector from './components/SessionSelector';
import SessionCounter from './components/SessionCounter';
import Settings from './components/Settings';

function AppContent() {
  const { timer, startTimer, pauseTimer, stopTimer, switchSession } = useTimer();

  // Update CSS variables based on session type
  useEffect(() => {
    const root = document.documentElement;
    
    if (timer.sessionType === 'work') {
      root.style.setProperty('--session-gradient-start', 'var(--work-gradient-start)');
      root.style.setProperty('--session-gradient-end', 'var(--work-gradient-end)');
      root.style.setProperty('--session-glow', 'var(--work-glow)');
    } else if (timer.sessionType === 'shortBreak') {
      root.style.setProperty('--session-gradient-start', 'var(--short-break-gradient-start)');
      root.style.setProperty('--session-gradient-end', 'var(--short-break-gradient-end)');
      root.style.setProperty('--session-glow', 'var(--short-break-glow)');
    } else {
      root.style.setProperty('--session-gradient-start', 'var(--long-break-gradient-start)');
      root.style.setProperty('--session-gradient-end', 'var(--long-break-gradient-end)');
      root.style.setProperty('--session-glow', 'var(--long-break-glow)');
    }
  }, [timer.sessionType]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if typing in an input
      if (e.target.tagName === 'INPUT') return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (timer.isRunning) {
            pauseTimer();
          } else {
            startTimer();
          }
          break;
        case 'Escape':
          e.preventDefault();
          stopTimer();
          break;
        case 'r':
        case 'R':
          if (!timer.isRunning && !timer.isPaused) {
            stopTimer();
          }
          break;
        case '1':
          if (!timer.isRunning && !timer.isPaused) {
            switchSession('work');
          }
          break;
        case '2':
          if (!timer.isRunning && !timer.isPaused) {
            switchSession('shortBreak');
          }
          break;
        case '3':
          if (!timer.isRunning && !timer.isPaused) {
            switchSession('longBreak');
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [timer.isRunning, timer.isPaused, startTimer, pauseTimer, stopTimer, switchSession]);

  // Update document title with timer
  useEffect(() => {
    const mins = Math.floor(timer.currentTime / 60);
    const secs = timer.currentTime % 60;
    const time = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    const sessionName = timer.sessionType === 'work' 
      ? '💼 Work'
      : timer.sessionType === 'shortBreak'
      ? '☕ Short Break'
      : '🌴 Long Break';

    document.title = timer.isRunning 
      ? `${time} - ${sessionName} | Pomodoro Tracker`
      : 'Pomodoro Tracker - Stay Focused';
  }, [timer.currentTime, timer.isRunning, timer.sessionType]);

  const getSessionTitle = () => {
    if (timer.sessionType === 'work') return 'Focus Time';
    if (timer.sessionType === 'shortBreak') return 'Take a Short Break';
    return 'Take a Long Break';
  };

  const getSessionDescription = () => {
    if (timer.sessionType === 'work') return 'Time to focus on your work';
    if (timer.sessionType === 'shortBreak') return 'Relax and recharge';
    return 'You earned a longer break!';
  };

  return (
    <div className="app">
      <Settings />
      
      <header className="app-header">
        <h1 className="app-title">Pomodoro Tracker</h1>
        <p className="app-subtitle">Stay focused and productive</p>
      </header>

      <main className="app-main">
        <SessionSelector />
        
        <div className="session-info">
          <h2 className="session-title">{getSessionTitle()}</h2>
          <p className="session-description">{getSessionDescription()}</p>
        </div>

        <Timer />

        <SessionCounter />

        <div className="keyboard-hints">
          <p>⌨️ Keyboard shortcuts: <kbd>Space</kbd> Start/Pause • <kbd>Esc</kbd> Stop • <kbd>1-3</kbd> Switch Session</p>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ using React & Vite</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <PomodoroProvider>
      <AppContent />
    </PomodoroProvider>
  );
}

export default App;
