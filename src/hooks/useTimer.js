import { useEffect, useRef } from 'react';
import { usePomodoro } from '../context/PomodoroContext';

export function useTimer() {
  const { state, dispatch, ACTIONS } = usePomodoro();
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio();
    // Using Web Audio API to generate a pleasant notification sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Play notification sound
  const playNotificationSound = () => {
    if (!state.settings.soundEnabled) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  // Show browser notification
  const showNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/vite.svg' });
    }
  };

  // Calculate next session type
  const getNextSessionType = () => {
    if (state.timer.sessionType === 'work') {
      const sessionsUntilLongBreak = state.sessions.completedWorkSessions % state.settings.sessionsBeforeLongBreak;
      return sessionsUntilLongBreak === 0 ? 'longBreak' : 'shortBreak';
    }
    return 'work';
  };

  // Timer tick effect
  useEffect(() => {
    if (state.timer.isRunning) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: ACTIONS.TICK });
      }, 1000);

      // Check if timer completed
      if (state.timer.currentTime === 0) {
        clearInterval(intervalRef.current);
        handleSessionComplete();
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.timer.isRunning, state.timer.currentTime]);

  // Handle session completion
  const handleSessionComplete = () => {
    dispatch({ type: ACTIONS.COMPLETE_SESSION });
    playNotificationSound();

    const sessionName = state.timer.sessionType === 'work' 
      ? 'Work Session' 
      : state.timer.sessionType === 'shortBreak'
      ? 'Short Break'
      : 'Long Break';

    showNotification('Pomodoro Timer', `${sessionName} completed! 🎉`);

    // Auto-start next session if enabled
    const nextSession = getNextSessionType();
    const autoStart = (nextSession === 'work' && state.settings.autoStartPomodoros) 
      || (nextSession !== 'work' && state.settings.autoStartBreaks);

    setTimeout(() => {
      switchSession(nextSession, autoStart);
    }, 1000);
  };

  // Timer controls
  const startTimer = () => {
    // Request notification permission on first start
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    dispatch({ type: ACTIONS.START_TIMER });
  };

  const pauseTimer = () => {
    dispatch({ type: ACTIONS.PAUSE_TIMER });
  };

  const resumeTimer = () => {
    dispatch({ type: ACTIONS.RESUME_TIMER });
  };

  const stopTimer = () => {
    dispatch({ type: ACTIONS.STOP_TIMER });
  };

  const switchSession = (sessionType, autoStart = false) => {
    dispatch({ type: ACTIONS.SWITCH_SESSION, payload: sessionType, autoStart });
  };

  const updateSettings = (newSettings) => {
    dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: newSettings });
  };

  const resetSessions = () => {
    dispatch({ type: ACTIONS.RESET_SESSIONS });
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const getProgress = () => {
    const totalDuration = state.timer.sessionType === 'work'
      ? state.settings.workDuration * 60
      : state.timer.sessionType === 'shortBreak'
      ? state.settings.shortBreakDuration * 60
      : state.settings.longBreakDuration * 60;

    return ((totalDuration - state.timer.currentTime) / totalDuration) * 100;
  };

  return {
    ...state,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    switchSession,
    updateSettings,
    resetSessions,
    formatTime,
    getProgress,
  };
}
