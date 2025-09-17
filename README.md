# Belajar Pintar - Smart Learning Platform

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

**A comprehensive, modern learning management system built with React and Vite**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

## About Belajar Pintar

**Belajar Pintar** is a modern, feature-rich Learning Management System (LMS) designed to provide an engaging and interactive educational experience. Built with cutting-edge React technologies, this platform serves as an administrative dashboard for managing educational content, tracking student progress, and facilitating collaborative learning through forums and gamified achievements.

The platform emphasizes modular architecture, scalability, and maintainability, making it an ideal solution for educational institutions, online course providers, and corporate training programs.

## Features

### **Analytics Dashboard**
- **Real-time Learning Analytics**: Comprehensive data visualization using Recharts
- **Progress Tracking**: Weekly learning progress, cumulative study hours
- **Performance Metrics**: Quiz performance analytics, module completion rates
- **Skill Assessment**: Radar charts for skill distribution analysis

### **Quiz Management System**
- **Interactive Quiz Creation**: Multiple question types (multiple choice, true/false, essay)
- **Real-time Timer**: Automatic quiz submission with time tracking
- **Progress Persistence**: Auto-save functionality with localStorage
- **Detailed Results**: Performance analysis with explanations and scoring

### **Forum & Community**
- **Threaded Discussions**: Nested reply system with voting
- **Category Management**: Organized discussion topics
- **Moderation Tools**: Thread management and content filtering
- **User Reputation**: Reputation scoring system with badges

### **Achievement System**
- **Gamified Learning**: Badge system with multiple achievement categories
- **Progress Visualization**: Interactive progress bars and learning paths
- **Milestone Tracking**: Automatic achievement unlocking based on activities
- **Custom Achievements**: Configurable achievement criteria

### **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Theme switching capabilities
- **Component Library**: Reusable UI components with consistent design
- **Error Boundaries**: Graceful error handling and user feedback

## Tech Stack

### **Frontend Core**
- **[React 19.1.0](https://reactjs.org/)** - Modern React with latest features
- **[Vite 7.0.0](https://vitejs.dev/)** - Next-generation frontend tooling
- **[React Router DOM 7.6.3](https://reactrouter.com/)** - Declarative routing

### **State Management**
- **[TanStack Query 5.81.5](https://tanstack.com/query)** - Server state management
- **React Context** - Global state management
- **Custom Hooks** - Business logic encapsulation
- **Reducers** - Complex state management

### **Styling & UI**
- **[Tailwind CSS 4.1.11](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React 0.525.0](https://lucide.dev/)** - Beautiful icon library
- **[Class Variance Authority](https://github.com/joe-bell/cva)** - Component variants
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility

### **Data Visualization**
- **[Recharts 3.0.2](https://recharts.org/)** - Composable charting library
- **Custom Chart Components** - Line, Bar, Area, Pie, and Radar charts

### **Developer Experience**
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[React Error Boundary](https://github.com/bvaughn/react-error-boundary)** - Error handling
- **Hot Module Replacement** - Fast development feedback
- **PropTypes** - Runtime type checking

## Quick Start

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/JavierFadel/belajar-pintar.git
cd belajar-pintar

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server with HMR
npm run preview      # Preview production build locally

# Production
npm run build        # Build for production

# Code Quality
npm run lint         # Run ESLint for code analysis
```

## Architecture

### Design Philosophy

The application follows a **modular, scalable architecture** based on modern React patterns:

#### **Separation of Concerns**
```
📁 Presentation Layer (components/) - UI components
    ↕ Props & Events
📁 Business Logic Layer (hooks/) - Custom hooks
    ↕ Data & Actions  
📁 Data Layer (services/) - API communication
    ↕ HTTP Requests
📁 State Management (contexts/, reducers/) - Global state
```

#### **Component Architecture**

1. **Presentational Components** (`/components`)
   - Pure, reusable UI components
   - Receive data via props
   - No business logic or side effects

2. **Container Components** (`/pages`) 
   - Smart components that orchestrate data flow
   - Use custom hooks for business logic
   - Manage local component state

3. **Custom Hooks** (`/hooks`)
   - Encapsulate business logic and side effects
   - Provide clean API for components
   - Handle data fetching and state management

4. **Services** (`/services`)
   - API communication layer
   - Data transformation and caching
   - Error handling and retry logic

### Data Flow

```
User Interaction → Page Component → Custom Hook → Service Layer → API/Storage
                                     ↓
UI Update ← Page Component ← Custom Hook ← Service Layer ← Response Data
```

### Project Structure

```
src/
├── 📁 assets/                 # Static assets
│   └── react.svg
├── 📁 components/             # Reusable UI components
│   ├── 📁 achievements/       # Achievement-related components
│   │   ├── BadgeCard.jsx      # Individual achievement badge
│   │   ├── LearningPath.jsx   # Learning progression visualization
│   │   └── ProgressBar.jsx    # Progress indicator
│   ├── 📁 charts/             # Data visualization components
│   │   ├── AreaChart.jsx      # Area chart component
│   │   ├── BarChart.jsx       # Bar chart component
│   │   ├── LineChart.jsx      # Line chart component
│   │   ├── PieChart.jsx       # Pie chart component
│   │   └── RadarChart.jsx     # Radar chart component
│   ├── 📁 common/             # Shared UI components
│   │   ├── Button.jsx         # Reusable button component
│   │   ├── ErrorBoundary.jsx  # Error boundary wrapper
│   │   ├── Input.jsx          # Form input component
│   │   ├── Layout.jsx         # Main layout wrapper
│   │   ├── LoadingSpinner.jsx # Loading indicator
│   │   ├── Modal.jsx          # Modal dialog component
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── Sidebar.jsx        # Sidebar navigation
│   │   └── UserInfo.jsx       # User information display
│   ├── 📁 forum/              # Forum-related components
│   │   ├── ForumToolbar.jsx   # Forum action toolbar
│   │   ├── Reply.jsx          # Individual reply component
│   │   ├── ReplyForm.jsx      # Reply creation form
│   │   ├── ReputationBadge.jsx # User reputation indicator
│   │   ├── SearchFilter.jsx   # Forum search and filtering
│   │   ├── StatCard.jsx       # Forum statistics card
│   │   ├── ThreadDetail.jsx   # Detailed thread view
│   │   ├── ThreadList.jsx     # Thread listing component
│   │   ├── ThreadListItem.jsx # Individual thread item
│   │   └── Voting.jsx         # Voting system component
│   └── 📁 quiz/               # Quiz-related components
│       ├── QuestionCard.jsx   # Individual question display
│       ├── QuizCard.jsx       # Quiz summary card
│       ├── QuizCreator.jsx    # Quiz creation interface
│       ├── QuizLobby.jsx      # Quiz selection lobby
│       ├── QuizResults.jsx    # Quiz results display
│       ├── QuizTaker.jsx      # Quiz taking interface
│       └── TimerComponent.jsx # Quiz timer
├── 📁 contexts/               # React Context providers
│   ├── AchievementContext.jsx # Achievement state management
│   ├── AuthContext.jsx        # Authentication state
│   ├── ThemeContext.jsx       # Theme switching
│   └── UserPreferencesContext.jsx # User preferences
├── 📁 hooks/                  # Custom React hooks
│   ├── useAnalytics.js        # Analytics data management
│   ├── useAuth.js             # Authentication logic
│   ├── useDebounce.js         # Debounce utility hook
│   ├── useForum.js            # Forum functionality
│   ├── useInstructors.js      # Instructor management
│   ├── useLocalStorage.js     # Local storage utilities
│   └── useQuiz.js             # Quiz logic and state
├── 📁 pages/                  # Page components (containers)
│   └── 📁 admin/              # Admin dashboard pages
│       ├── Dashboard.jsx      # Main analytics dashboard
│       ├── DemoContent.jsx    # Demo/sample content
│       ├── Forum.jsx          # Forum management page
│       ├── Instruktur.jsx     # Instructor management
│       ├── Pencapaian.jsx     # Achievement management
│       └── Quiz.jsx           # Quiz management page
├── 📁 reducers/               # State reducers for complex state
│   ├── achievementReducer.js  # Achievement state reducer
│   ├── forumReducer.js        # Forum state management
│   └── quizReducer.js         # Quiz state reducer
├── 📁 services/               # API communication layer
│   ├── analyticsService.js    # Analytics data service
│   ├── api.js                 # Base API configuration
│   ├── forumService.js        # Forum API operations
│   ├── quizService.js         # Quiz API operations
│   └── userService.js         # User management service
├── 📁 styles/                 # Global styles
│   └── global.css             # Global CSS styles
├── 📁 utils/                  # Utility functions and constants
│   ├── cn.js                  # className utility
│   ├── constants.js           # Application constants
│   ├── dateUtils.js           # Date manipulation utilities
│   ├── dummyData.js           # Mock data for development
│   └── helpers.js             # General helper functions
├── App.jsx                    # Root application component
├── index.css                  # Entry point styles
└── main.jsx                   # Application entry point
```

## Key Components

### Dashboard Analytics
- **Multi-chart visualization** with Recharts integration
- **Real-time data updates** using TanStack Query
- **Responsive grid layout** with Tailwind CSS
- **Interactive filtering** and data exploration

### Quiz System
- **Progressive question navigation** with review capabilities
- **Auto-save functionality** to prevent data loss
- **Timer management** with automatic submission
- **Comprehensive results analysis** with explanations

### Forum Platform
- **Threaded discussion system** with nested replies
- **Real-time search and filtering** capabilities
- **User reputation and voting** system
- **Moderation tools** for content management

### Achievement Engine
- **Dynamic badge unlocking** based on user activities
- **Progress tracking** with visual indicators
- **Learning path visualization** with milestone markers
- **Customizable achievement criteria**

## Development Patterns

### Custom Hooks Pattern
```jsx
// hooks/useQuiz.js
export const useQuiz = (quizId) => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  
  const submitQuiz = useCallback(async () => {
    // Business logic here
  }, []);
  
  return {
    currentQuiz,
    answers,
    submitQuiz,
    // ... other exposed state and functions
  };
};
```

### Service Layer Pattern
```jsx
// services/quizService.js
export const quizService = {
  getQuizById: async (id) => {
    // API call implementation
  },
  submitAnswers: async (quizId, answers) => {
    // Submit logic
  }
};
```

### Component Composition
```jsx
// pages/Quiz.jsx (Container)
function QuizPage() {
  const { currentQuiz, answers, submitQuiz } = useQuiz(quizId);
  
  return (
    <QuizTaker 
      quiz={currentQuiz}
      answers={answers}
      onSubmit={submitQuiz}
    />
  );
}

// components/quiz/QuizTaker.jsx (Presentational)
function QuizTaker({ quiz, answers, onSubmit }) {
  // Pure UI logic only
}
```

## Features in Detail

### Analytics Dashboard
- **Weekly Progress Tracking**: Line charts showing study hours and module completion
- **Quiz Performance Analysis**: Bar charts with score distribution and improvement trends
- **Cumulative Study Hours**: Area charts displaying learning consistency
- **Module Status Distribution**: Pie charts showing completion rates
- **Skills Assessment**: Radar charts for competency analysis

### Quiz Management
- **Multiple Question Types**: Support for multiple choice, true/false, and essay questions
- **Flexible Timing**: Configurable time limits with countdown timers
- **Progress Persistence**: Automatic saving of quiz progress to localStorage
- **Comprehensive Scoring**: Detailed results with explanations and performance metrics
- **Review Mode**: Question review with marked questions for later revisit

### Forum System
- **Thread Management**: Create, edit, and moderate discussion threads
- **Category Organization**: Organize discussions by topic and subject area
- **Voting System**: Upvote/downvote functionality for quality content curation
- **User Reputation**: Track user contributions and expertise levels
- **Advanced Search**: Full-text search with filtering options

### Achievement System
- **Badge Categories**: Programming, learning, participation, and milestone achievements
- **Progress Tracking**: Visual progress bars showing completion status
- **Learning Paths**: Structured learning progression with dependencies
- **Automatic Unlocking**: Dynamic achievement detection based on user activities

## State Management

### Global State (React Context)
- **AuthContext**: User authentication and authorization
- **ThemeContext**: Application theme and appearance settings
- **AchievementContext**: Global achievement state and progress
- **UserPreferencesContext**: User-specific settings and preferences

### Local State (Custom Hooks)
- **useQuiz**: Quiz-specific state and business logic
- **useForum**: Forum operations and thread management
- **useAnalytics**: Analytics data processing and visualization

### Server State (TanStack Query)
- **Data fetching** with automatic caching and synchronization
- **Background updates** and stale-while-revalidate pattern
- **Error handling** and retry mechanisms
- **Optimistic updates** for better user experience

## Performance Optimizations

### Code Splitting
- **Lazy loading** of page components
- **Dynamic imports** for heavy dependencies
- **Route-based splitting** for optimal bundle sizes

### Caching Strategy
- **TanStack Query** for server state caching
- **localStorage** for user preferences and quiz progress
- **Memoization** of expensive calculations

### Rendering Optimizations
- **React.memo** for component optimization
- **useCallback** and **useMemo** for function and value memoization
- **Virtual scrolling** for large lists (forum threads, quiz questions)

## Data Integration Status

### **Current Implementation** 📊
The application currently operates with **comprehensive mock data** and a **fully-prepared API service layer** ready for backend integration.

#### Mock Data Structure
All application data is currently sourced from `src/utils/dummyData.js`:
- **Users**: 12 complete user profiles with roles (student, instructor, admin)
- **Learning Modules**: 12 modules with progress tracking and completion status
- **Quizzes**: 30+ interactive quizzes with multiple question types
- **Forum Data**: Categories, threads, replies, and voting system
- **Achievements**: Badge system with progress tracking and unlocking criteria
- **Analytics**: Weekly progress, performance metrics, and skill assessments

#### API Service Layer Architecture
Complete service layer implemented in `src/services/` with production-ready structure:

```javascript
// services/api.js - Base configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

// Example service method ready for backend
export const quizService = {
  getQuizzes: async ({ page = 1, limit = 10, difficulty = null }) => {
    // Currently: await simulateApiDelay(400);
    // Future: const response = await api.get('/quizzes', { page, limit, difficulty });
    return response;
  }
};
```

### **Service Layer Status** ✅

| Service | File | Backend Ready | Features |
|---------|------|---------------|----------|
| **Authentication** | `userService.js` | ✅ Ready | Login, register, profile management |
| **Quiz Management** | `quizService.js` | ✅ Ready | CRUD operations, submissions, scoring |
| **Forum Operations** | `forumService.js` | ✅ Ready | Threads, replies, voting, moderation |
| **Analytics** | `analyticsService.js` | ✅ Ready | Progress tracking, performance metrics |
| **User Management** | `userService.js` | ✅ Ready | Profiles, preferences, achievements |

### **API Simulation Features** ⏱
Currently implements realistic API behavior:
- **Simulated delays** (300-500ms) for authentic UX
- **Error handling** with proper error codes and messages
- **Pagination** support with page/limit parameters
- **Sorting and filtering** capabilities
- **JWT token simulation** for authentication flow

### **Backend Integration Readiness** 

#### Environment Configuration
```bash
# .env - Ready for production
REACT_APP_API_URL=https://your-backend-api.com/api/v1
REACT_APP_ENVIRONMENT=production
```

#### Expected API Endpoints
The frontend is architected to work with these RESTful endpoints:

**Authentication & Users**
```
POST /auth/login
POST /auth/register  
GET  /users/{id}
PUT  /users/{id}
GET  /users/{id}/achievements
GET  /users/{id}/progress
```

**Quiz System**
```
GET  /quizzes
POST /quizzes
GET  /quizzes/{id}
PUT  /quizzes/{id}
POST /quizzes/{id}/submit
GET  /quizzes/{id}/results
```

**Forum Management**
```
GET  /forum/categories
GET  /forum/threads
POST /forum/threads
GET  /forum/threads/{id}
POST /forum/threads/{id}/replies
PUT  /forum/threads/{id}/vote
```

**Analytics & Reporting**
```
GET  /analytics/dashboard/{userId}
GET  /analytics/learning-progress/{userId}
GET  /analytics/quiz-performance/{userId}
```

### **Migration Strategy** 

#### Phase 1: Infrastructure Setup
1. **Backend API Development** - Implement endpoints matching service layer
2. **Database Schema** - Use existing data structures as schema reference
3. **Environment Configuration** - Set production API URLs

#### Phase 2: Gradual Migration
```javascript
// Example migration approach
// Before (Mock)
await simulateApiDelay(400);
return mockQuizData;

// After (Real API)
const response = await fetch(`${API_BASE_URL}/quizzes`);
return response.json();
```

#### Phase 3: Enhanced Features
- **Real-time notifications** with WebSocket integration
- **File upload** support for quiz images and user avatars
- **Advanced caching** with Redis for performance optimization

### **Data Models** 
All data structures are well-defined and ready for database implementation:

```javascript
// User Model Example
{
  id: 1,
  name: "Javier Fadel",
  email: "javier.fadel@university.edu",
  role: "student", // student, instructor, admin
  avatar: "https://...",
  totalPoints: 1250,
  studyStreak: 12,
  achievements: [1, 3, 5],
  preferences: {
    theme: "light",
    notifications: true
  }
}
```

### **Integration Checklist** 

- [x] **Service Layer** - Complete API abstraction implemented
- [x] **Error Handling** - Comprehensive error management system
- [x] **Authentication Flow** - JWT token management ready
- [x] **Data Models** - All structures defined and documented
- [x] **Environment Config** - Production-ready configuration
- [ ] **Backend API** - Awaiting implementation
- [ ] **Real-time Features** - WebSocket integration pending
- [ ] **File Uploads** - Multipart form handling needed

**Status**: The frontend is **100% ready** for backend integration with minimal code changes required.

## Security Considerations

### Data Protection
- **Input validation** and sanitization
- **XSS prevention** through proper data handling
- **localStorage encryption** for sensitive data

### Authentication
- **JWT token management** with secure storage
- **Protected routes** with authentication guards
- **Session timeout** handling

## Testing Strategy

### Unit Testing
- **Component testing** with React Testing Library
- **Hook testing** with custom test utilities
- **Service layer testing** with mock implementations

### Integration Testing
- **User flow testing** with realistic scenarios
- **API integration testing** with mock servers
- **Error boundary testing** for graceful failure handling

## Deployment

### Build Process
```bash
# Production build
npm run build

# Build optimization
npm run preview  # Test production build locally
```

### Environment Configuration
- **Development**: Hot reloading with Vite dev server
- **Production**: Optimized build with code splitting and minification
- **Staging**: Production-like environment for testing

## Future Enhancements

### Planned Features
- **Real-time notifications** with WebSocket integration
- **Video content support** with streaming capabilities
- **Mobile application** with React Native
- **Advanced analytics** with machine learning insights
- **Internationalization** (i18n) support
- **Accessibility improvements** (WCAG compliance)

### Technical Improvements
- **Progressive Web App** (PWA) capabilities
- **Offline functionality** with service workers
- **Advanced caching** with Redis integration
- **Microservices architecture** for scalability

## Contributing

We welcome contributions to Belajar Pintar! Please follow these guidelines:

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- Follow **ESLint** configuration
- Write **meaningful commit messages**
- Include **PropTypes** for component props
- Add **JSDoc comments** for complex functions
- Ensure **responsive design** compliance

### Testing Requirements
- Write **unit tests** for new components
- Ensure **existing tests pass**
- Test **cross-browser compatibility**
- Validate **accessibility standards**

## Author

**Javier Fadel**
- GitHub: [@JavierFadel](https://github.com/JavierFadel)
- Repository: [belajar-pintar](https://github.com/JavierFadel/belajar-pintar)

---

<div align="center">

**Built with ❤️ using React and modern web technologies**

⭐ **Star this repository if you find it helpful!** ⭐

</div>