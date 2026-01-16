import { createContext, useContext, useReducer, useEffect } from 'react';

const PomodoroContext = createContext();

// Default settings
const defaultSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
  soundEnabled: true,
  autoStartBreaks: false,
  autoStartPomodoros: false,
};

// Initial state
const initialState = {
  timer: {
    currentTime: 25 * 60, // seconds
    isRunning: false,
    isPaused: false,
    sessionType: 'work', // 'work' | 'shortBreak' | 'longBreak'
  },
  sessions: {
    completedWorkSessions: 0,
    totalWorkSessions: 0,
  },
  settings: defaultSettings,
};

// Action types
const ACTIONS = {
  START_TIMER: 'START_TIMER',
  PAUSE_TIMER: 'PAUSE_TIMER',
  RESUME_TIMER: 'RESUME_TIMER',
  STOP_TIMER: 'STOP_TIMER',
  TICK: 'TICK',
  COMPLETE_SESSION: 'COMPLETE_SESSION',
  SWITCH_SESSION: 'SWITCH_SESSION',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  RESET_SESSIONS: 'RESET_SESSIONS',
  LOAD_STATE: 'LOAD_STATE',
};

// Reducer
function pomodoroReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_TIMER:
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: true,
          isPaused: false,
        },
      };

    case ACTIONS.PAUSE_TIMER:
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false,
          isPaused: true,
        },
      };

    case ACTIONS.RESUME_TIMER:
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: true,
          isPaused: false,
        },
      };

    case ACTIONS.STOP_TIMER:
      const duration = state.timer.sessionType === 'work'
        ? state.settings.workDuration
        : state.timer.sessionType === 'shortBreak'
        ? state.settings.shortBreakDuration
        : state.settings.longBreakDuration;

      return {
        ...state,
        timer: {
          ...state.timer,
          currentTime: duration * 60,
          isRunning: false,
          isPaused: false,
        },
      };

    case ACTIONS.TICK:
      const newTime = Math.max(0, state.timer.currentTime - 1);
      return {
        ...state,
        timer: {
          ...state.timer,
          currentTime: newTime,
        },
      };

    case ACTIONS.COMPLETE_SESSION:
      let newCompletedSessions = state.sessions.completedWorkSessions;
      let newTotalSessions = state.sessions.totalWorkSessions;

      if (state.timer.sessionType === 'work') {
        newCompletedSessions += 1;
        newTotalSessions += 1;
      }

      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false,
        },
        sessions: {
          completedWorkSessions: newCompletedSessions,
          totalWorkSessions: newTotalSessions,
        },
      };

    case ACTIONS.SWITCH_SESSION:
      const newSessionType = action.payload;
      const newDuration = newSessionType === 'work'
        ? state.settings.workDuration
        : newSessionType === 'shortBreak'
        ? state.settings.shortBreakDuration
        : state.settings.longBreakDuration;

      return {
        ...state,
        timer: {
          ...state.timer,
          sessionType: newSessionType,
          currentTime: newDuration * 60,
          isRunning: action.autoStart || false,
          isPaused: false,
        },
      };

    case ACTIONS.UPDATE_SETTINGS:
      const updatedSettings = { ...state.settings, ...action.payload };
      
      // Update current time if we're not running and settings changed
      let updatedCurrentTime = state.timer.currentTime;
      if (!state.timer.isRunning && !state.timer.isPaused) {
        const currentDuration = state.timer.sessionType === 'work'
          ? updatedSettings.workDuration
          : state.timer.sessionType === 'shortBreak'
          ? updatedSettings.shortBreakDuration
          : updatedSettings.longBreakDuration;
        updatedCurrentTime = currentDuration * 60;
      }

      return {
        ...state,
        settings: updatedSettings,
        timer: {
          ...state.timer,
          currentTime: updatedCurrentTime,
        },
      };

    case ACTIONS.RESET_SESSIONS:
      return {
        ...state,
        sessions: {
          completedWorkSessions: 0,
          totalWorkSessions: 0,
        },
      };

    case ACTIONS.LOAD_STATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}

// Provider component
export function PomodoroProvider({ children }) {
  const [state, dispatch] = useReducer(pomodoroReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoro_settings');
    const savedSessions = localStorage.getItem('pomodoro_sessions');

    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: settings });
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    }

    if (savedSessions) {
      try {
        const sessions = JSON.parse(savedSessions);
        dispatch({
          type: ACTIONS.LOAD_STATE,
          payload: { sessions },
        });
      } catch (e) {
        console.error('Failed to load sessions:', e);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pomodoro_settings', JSON.stringify(state.settings));
  }, [state.settings]);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pomodoro_sessions', JSON.stringify(state.sessions));
  }, [state.sessions]);

  return (
    <PomodoroContext.Provider value={{ state, dispatch, ACTIONS }}>
      {children}
    </PomodoroContext.Provider>
  );
}

// Custom hook to use the context
export function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
}
