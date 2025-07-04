# Belajar Pintar - Project Structure & Setup

## 1. Initial Project Setup

```bash
# Create React app
npx create-react-app belajar-pintar
cd belajar-pintar

# Install required dependencies
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install react-router-dom
npm install recharts
npm install lucide-react
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. Project Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components
│   │   ├── Layout.js
│   │   ├── Navbar.js
│   │   ├── Sidebar.js
│   │   ├── LoadingSpinner.js
│   │   ├── ErrorBoundary.js
│   │   └── Modal.js
│   ├── charts/          # Chart components
│   │   ├── LineChart.js
│   │   ├── BarChart.js
│   │   ├── PieChart.js
│   │   ├── AreaChart.js
│   │   └── RadarChart.js
│   ├── quiz/            # Quiz-specific components
│   │   ├── QuizCreator.js
│   │   ├── QuizTaker.js
│   │   ├── QuestionCard.js
│   │   └── TimerComponent.js
│   ├── forum/           # Forum components
│   │   ├── ThreadList.js
│   │   ├── ThreadDetail.js
│   │   ├── ReplyForm.js
│   │   └── SearchFilter.js
│   └── achievements/    # Achievement components
│       ├── BadgeCard.js
│       ├── ProgressBar.js
│       └── LearningPath.js
├── pages/               # Page components
│   └── admin/          # Admin pages
│       ├── Dashboard.js
│       ├── Quiz.js
│       ├── Forum.js
│       ├── Pencapaian.js
│       └── Instruktur.js
├── hooks/              # Custom hooks
│   ├── useAuth.js
│   ├── useLocalStorage.js
│   ├── useQuiz.js
│   ├── useForum.js
│   └── useAnalytics.js
├── contexts/           # React contexts
│   ├── AuthContext.js
│   ├── ThemeContext.js
│   ├── UserPreferencesContext.js
│   └── AchievementContext.js
├── reducers/           # State reducers
│   ├── quizReducer.js
│   ├── forumReducer.js
│   └── achievementReducer.js
├── services/           # API services
│   ├── api.js
│   ├── quizService.js
│   ├── forumService.js
│   ├── analyticsService.js
│   └── userService.js
├── utils/              # Utility functions
│   ├── dummyData.js
│   ├── constants.js
│   ├── helpers.js
│   └── dateUtils.js
├── styles/             # CSS files
│   ├── globals.css
│   ├── components.css
│   └── tailwind.css
├── App.js              # Main app component
├── App.css
└── index.js            # Entry point
```

## 3. Key Configuration Files

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
}
```

### src/styles/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md border border-gray-200 p-6;
  }
  
  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500;
  }
}
```

## 4. Route Structure

### src/App.js (Main routing)
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AchievementProvider } from './contexts/AchievementContext';

// Components
import Layout from './components/common/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';

// Pages
import Dashboard from './pages/admin/Dashboard';
import Quiz from './pages/admin/Quiz';
import Forum from './pages/admin/Forum';
import Pencapaian from './pages/admin/Pencapaian';
import Instruktur from './pages/admin/Instruktur';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AchievementProvider>
            <Router>
              <ErrorBoundary>
                <Layout>
                  <Routes>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/quiz" element={<Quiz />} />
                    <Route path="/admin/forum" element={<Forum />} />
                    <Route path="/admin/pencapaian" element={<Pencapaian />} />
                    <Route path="/admin/instruktur" element={<Instruktur />} />
                    <Route path="/" element={<Dashboard />} />
                  </Routes>
                </Layout>
              </ErrorBoundary>
            </Router>
          </AchievementProvider>
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
```

## 5. Development Workflow

### Phase 1: Foundation Setup
1. Create project structure
2. Set up routing and navigation
3. Create dummy data
4. Set up contexts and providers

### Phase 2: Core Components
1. Build layout components (Navbar, Sidebar)
2. Create chart components with Recharts
3. Implement error boundaries
4. Build reusable UI components

### Phase 3: Features Implementation
1. Dashboard with analytics
2. Quiz system
3. Forum functionality
4. Achievement system
5. Instructor dashboard

### Phase 4: State Management
1. Implement React Query for server state
2. Set up reducers for complex state
3. Create custom hooks
4. Add error handling

### Phase 5: Polish & Testing
1. Add loading states
2. Implement responsive design
3. Add animations and transitions
4. Test all functionality

## 6. Next Steps

1. **Set up the basic project structure** with the directories above
2. **Create the dummy data file** with required modules, quizzes, and achievements
3. **Build the main layout components** (Navbar, Sidebar, Layout)
4. **Set up routing** and basic navigation
5. **Create contexts** for global state management

Would you like me to start with any specific part of this structure?