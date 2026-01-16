import { useState } from 'react';
import './Settings.css';
import { useTimer } from '../hooks/useTimer';

export default function Settings() {
  const { settings, updateSettings, resetSessions } = useTimer();
  const [isOpen, setIsOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleOpen = () => {
    setTempSettings(settings);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    updateSettings(tempSettings);
    setIsOpen(false);
  };

  const handleChange = (key, value) => {
    setTempSettings({ ...tempSettings, [key]: value });
  };

  const handleResetSessions = () => {
    if (window.confirm('Are you sure you want to reset your session count?')) {
      resetSessions();
    }
  };

  return (
    <>
      <button
        className="settings-trigger"
        onClick={handleOpen}
        aria-label="Open settings"
      >
        ⚙️
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Settings</h2>
              <button
                className="close-btn"
                onClick={handleClose}
                aria-label="Close settings"
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="settings-section">
                <h3>⏱️ Timer Durations (minutes)</h3>
                
                <div className="setting-item">
                  <label htmlFor="workDuration">Work Session</label>
                  <input
                    id="workDuration"
                    type="number"
                    min="1"
                    max="60"
                    value={tempSettings.workDuration}
                    onChange={(e) => handleChange('workDuration', parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="setting-item">
                  <label htmlFor="shortBreakDuration">Short Break</label>
                  <input
                    id="shortBreakDuration"
                    type="number"
                    min="1"
                    max="30"
                    value={tempSettings.shortBreakDuration}
                    onChange={(e) => handleChange('shortBreakDuration', parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="setting-item">
                  <label htmlFor="longBreakDuration">Long Break</label>
                  <input
                    id="longBreakDuration"
                    type="number"
                    min="1"
                    max="60"
                    value={tempSettings.longBreakDuration}
                    onChange={(e) => handleChange('longBreakDuration', parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="setting-item">
                  <label htmlFor="sessionsBeforeLongBreak">Sessions Before Long Break</label>
                  <input
                    id="sessionsBeforeLongBreak"
                    type="number"
                    min="2"
                    max="10"
                    value={tempSettings.sessionsBeforeLongBreak}
                    onChange={(e) => handleChange('sessionsBeforeLongBreak', parseInt(e.target.value) || 2)}
                  />
                </div>
              </div>

              <div className="settings-section">
                <h3>🔔 Preferences</h3>

                <div className="setting-item setting-checkbox">
                  <label htmlFor="soundEnabled">
                    <input
                      id="soundEnabled"
                      type="checkbox"
                      checked={tempSettings.soundEnabled}
                      onChange={(e) => handleChange('soundEnabled', e.target.checked)}
                    />
                    <span>Enable notification sounds</span>
                  </label>
                </div>

                <div className="setting-item setting-checkbox">
                  <label htmlFor="autoStartBreaks">
                    <input
                      id="autoStartBreaks"
                      type="checkbox"
                      checked={tempSettings.autoStartBreaks}
                      onChange={(e) => handleChange('autoStartBreaks', e.target.checked)}
                    />
                    <span>Auto-start breaks</span>
                  </label>
                </div>

                <div className="setting-item setting-checkbox">
                  <label htmlFor="autoStartPomodoros">
                    <input
                      id="autoStartPomodoros"
                      type="checkbox"
                      checked={tempSettings.autoStartPomodoros}
                      onChange={(e) => handleChange('autoStartPomodoros', e.target.checked)}
                    />
                    <span>Auto-start work sessions</span>
                  </label>
                </div>
              </div>

              <div className="settings-section">
                <h3>🗑️ Data Management</h3>
                <button className="btn-danger" onClick={handleResetSessions}>
                  Reset Session Count
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
