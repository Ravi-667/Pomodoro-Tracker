# 🍅 Pomodoro Tracker

A beautiful and modern Pomodoro Timer application built with React and Vite. Stay focused and boost your productivity using the proven Pomodoro Technique!

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://pomodoro-tracker-five.vercel.app/)

![Pomodoro Tracker](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-6.0-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- ⏱️ **Customizable Timer Durations** - Set work sessions, short breaks, and long breaks to your preference
- 🎨 **Dynamic Color Theming** - UI adapts with beautiful gradients based on current session type
- 🔔 **Audio & Browser Notifications** - Get notified when sessions complete
- 📊 **Session Tracking** - Track your completed work sessions
- ⚙️ **Flexible Settings** - Customize durations, auto-start preferences, and more
- ⌨️ **Keyboard Shortcuts** - Control the timer without touching your mouse
- 💾 **Persistent Storage** - Your settings and session count are saved automatically
- 📱 **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- ♿ **Accessible** - Full keyboard navigation and screen reader support
- 🎭 **Premium UI** - Glassmorphism effects, smooth animations, and modern aesthetics

## 🎯 What is the Pomodoro Technique?

The Pomodoro Technique is a time management method that uses a timer to break work into intervals (traditionally 25 minutes) separated by short breaks. This helps maintain focus and prevents burnout.

**Default Configuration:**
- 🔴 Work Session: 25 minutes
- 🟢 Short Break: 5 minutes  
- 🔵 Long Break: 15 minutes (after every 4 work sessions)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ravi-667/Pomodoro-Tracker.git
   cd Pomodoro-Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 🎮 How to Use

1. **Select Session Type** - Choose between Work, Short Break, or Long Break
2. **Start Timer** - Click the "Start" button or press `Space`
3. **Focus** - Work on your task until the timer completes
4. **Take Breaks** - When prompted, take your break
5. **Repeat** - Continue the cycle to maintain productivity

### Keyboard Shortcuts

- `Space` - Start/Pause timer
- `Esc` - Stop and reset timer
- `1` - Switch to Work session
- `2` - Switch to Short Break
- `3` - Switch to Long Break
- `R` - Reset current timer

## ⚙️ Configuration

Click the ⚙️ settings icon in the top-right to customize:

- **Timer Durations** - Set custom minutes for each session type
- **Sessions Before Long Break** - Configure how many work sessions before a long break
- **Sound Notifications** - Enable/disable notification sounds
- **Auto-Start Options** - Automatically start breaks or work sessions

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite 6** - Build tool and dev server
- **Context API + useReducer** - State management
- **Web Audio API** - Notification sounds
- **Notification API** - Browser notifications
- **localStorage** - Data persistence
- **CSS Custom Properties** - Dynamic theming

## 📁 Project Structure

```
Pomodoro-Tracker/
├── src/
│   ├── components/          # React components
│   │   ├── Timer.jsx       # Main timer with circular progress
│   │   ├── SessionSelector.jsx  # Session type switcher
│   │   ├── SessionCounter.jsx   # Completed sessions display
│   │   └── Settings.jsx    # Settings modal
│   ├── context/
│   │   └── PomodoroContext.jsx  # Global state management
│   ├── hooks/
│   │   └── useTimer.js     # Timer logic and controls
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Deploy to GitHub Pages

1. **Update `vite.config.js`** with your repo name as base
2. **Build and deploy**
   ```bash
   npm run build
   gh-pages -d dist
   ```

### Deploy to Cloudflare Pages

1. **Connect your repository** via Cloudflare dashboard
2. **Set build command:** `npm run build`
3. **Set output directory:** `dist`

## 🎨 Design Inspiration

This project features a premium, modern design with:
- Glassmorphism UI elements
- Smooth gradient transitions
- Micro-animations for enhanced UX
- Color-coded session types
- Dark-mode-first approach

Inspired by modern productivity apps like [Pomofocus](https://pomofocus.io) and [time.fyi](https://time.fyi).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💖 Acknowledgments

- Built as part of the [roadmap.sh](https://roadmap.sh/projects/pomodoro-tracker) Frontend Projects
- Pomodoro Technique® by Francesco Cirillo

---

**Built with ❤️ by [Ravi Keservani](https://github.com/Ravi-667)**