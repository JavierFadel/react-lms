// utils/dummyData.js

// Modules data (minimum 10 required)
export const modules = [
    {
        id: 1,
        title: "Introduction to React",
        category: "Programming",
        description: "Learn the basics of React including components, JSX, and state management",
        duration: 120, // minutes
        difficulty: "Beginner",
        status: "completed",
        progress: 100,
        completedAt: "2024-06-15T10:30:00Z",
        studyTime: 150, // minutes actually spent
        rating: 4.8,
        topics: ["Components", "JSX", "Props", "State"],
        instructor: "John Doe",
        thumbnail: "https://via.placeholder.com/300x200?text=React+Basics"
    },
    {
        id: 2,
        title: "Advanced React Hooks",
        category: "Programming",
        description: "Deep dive into React Hooks including custom hooks and advanced patterns",
        duration: 180,
        difficulty: "Advanced",
        status: "in-progress",
        progress: 65,
        completedAt: null,
        studyTime: 95,
        rating: 4.9,
        topics: ["useEffect", "useContext", "useReducer", "Custom Hooks"],
        instructor: "Jane Smith",
        thumbnail: "https://via.placeholder.com/300x200?text=React+Hooks"
    },
    {
        id: 3,
        title: "Database Design Fundamentals",
        category: "Database",
        description: "Learn how to design efficient and scalable database schemas",
        duration: 150,
        difficulty: "Intermediate",
        status: "completed",
        progress: 100,
        completedAt: "2024-06-20T14:45:00Z",
        studyTime: 175,
        rating: 4.7,
        topics: ["ERD", "Normalization", "Indexing", "Relationships"],
        instructor: "Mike Johnson",
        thumbnail: "https://via.placeholder.com/300x200?text=Database+Design"
    },
    {
        id: 4,
        title: "SQL Query Optimization",
        category: "Database",
        description: "Advanced techniques for optimizing SQL queries and database performance",
        duration: 200,
        difficulty: "Advanced",
        status: "not-started",
        progress: 0,
        completedAt: null,
        studyTime: 0,
        rating: 4.6,
        topics: ["Query Plans", "Indexes", "Performance Tuning", "Stored Procedures"],
        instructor: "Sarah Wilson",
        thumbnail: "https://via.placeholder.com/300x200?text=SQL+Optimization"
    },
    {
        id: 5,
        title: "Network Security Basics",
        category: "Network",
        description: "Understanding network security principles and common attack vectors",
        duration: 160,
        difficulty: "Intermediate",
        status: "in-progress",
        progress: 30,
        completedAt: null,
        studyTime: 45,
        rating: 4.5,
        topics: ["Firewalls", "VPN", "Encryption", "Authentication"],
        instructor: "David Brown",
        thumbnail: "https://via.placeholder.com/300x200?text=Network+Security"
    },
    {
        id: 6,
        title: "JavaScript ES6+ Features",
        category: "Programming",
        description: "Modern JavaScript features and best practices",
        duration: 140,
        difficulty: "Intermediate",
        status: "completed",
        progress: 100,
        completedAt: "2024-06-18T16:20:00Z",
        studyTime: 145,
        rating: 4.8,
        topics: ["Arrow Functions", "Destructuring", "Promises", "Async/Await"],
        instructor: "Emily Davis",
        thumbnail: "https://via.placeholder.com/300x200?text=JavaScript+ES6"
    },
    {
        id: 7,
        title: "Cloud Computing Fundamentals",
        category: "Cloud",
        description: "Introduction to cloud services and deployment strategies",
        duration: 190,
        difficulty: "Beginner",
        status: "not-started",
        progress: 0,
        completedAt: null,
        studyTime: 0,
        rating: 4.4,
        topics: ["AWS", "Azure", "Docker", "Kubernetes"],
        instructor: "Robert Taylor",
        thumbnail: "https://via.placeholder.com/300x200?text=Cloud+Computing"
    },
    {
        id: 8,
        title: "API Design and Development",
        category: "Programming",
        description: "Best practices for designing and building RESTful APIs",
        duration: 170,
        difficulty: "Intermediate",
        status: "completed",
        progress: 100,
        completedAt: "2024-06-22T11:15:00Z",
        studyTime: 180,
        rating: 4.7,
        topics: ["REST", "HTTP Methods", "Authentication", "Documentation"],
        instructor: "Lisa Anderson",
        thumbnail: "https://via.placeholder.com/300x200?text=API+Design"
    },
    {
        id: 9,
        title: "Mobile App Development",
        category: "Programming",
        description: "Building cross-platform mobile applications with React Native",
        duration: 220,
        difficulty: "Advanced",
        status: "in-progress",
        progress: 15,
        completedAt: null,
        studyTime: 25,
        rating: 4.6,
        topics: ["React Native", "Navigation", "State Management", "Native Modules"],
        instructor: "Chris Martinez",
        thumbnail: "https://via.placeholder.com/300x200?text=Mobile+Development"
    },
    {
        id: 10,
        title: "Data Structures and Algorithms",
        category: "Programming",
        description: "Essential data structures and algorithmic thinking",
        duration: 240,
        difficulty: "Intermediate",
        status: "not-started",
        progress: 0,
        completedAt: null,
        studyTime: 0,
        rating: 4.9,
        topics: ["Arrays", "Linked Lists", "Trees", "Sorting", "Searching"],
        instructor: "Alex Thompson",
        thumbnail: "https://via.placeholder.com/300x200?text=Data+Structures"
    },
    {
        id: 11,
        title: "System Architecture Design",
        category: "Architecture",
        description: "Designing scalable and maintainable system architectures",
        duration: 210,
        difficulty: "Advanced",
        status: "not-started",
        progress: 0,
        completedAt: null,
        studyTime: 0,
        rating: 4.8,
        topics: ["Microservices", "Load Balancing", "Caching", "Scalability"],
        instructor: "Maria Garcia",
        thumbnail: "https://via.placeholder.com/300x200?text=System+Architecture"
    },
    {
        id: 12,
        title: "DevOps and CI/CD",
        category: "DevOps",
        description: "Implementing continuous integration and deployment pipelines",
        duration: 180,
        difficulty: "Intermediate",
        status: "bookmarked",
        progress: 0,
        completedAt: null,
        studyTime: 0,
        rating: 4.5,
        topics: ["Git", "Jenkins", "Docker", "Monitoring"],
        instructor: "Kevin Wilson",
        thumbnail: "https://via.placeholder.com/300x200?text=DevOps+CICD"
    }
];

// Quizzes data (minimum 30 required)
export const quizzes = [
    {
        id: 1,
        title: "React Basics Quiz",
        moduleId: 1,
        category: "Programming",
        description: "Test your knowledge of React fundamentals",
        questions: [
            {
                id: 1,
                type: "multiple-choice",
                question: "What is JSX?",
                options: [
                    "A JavaScript library",
                    "A syntax extension for JavaScript",
                    "A database query language",
                    "A CSS framework"
                ],
                correctAnswer: 1,
                explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files."
            },
            {
                id: 2,
                type: "true-false",
                question: "React components must always return a single parent element.",
                correctAnswer: false,
                explanation: "With React Fragments or React 16+, components can return multiple elements without a wrapper."
            },
            {
                id: 3,
                type: "multiple-choice",
                question: "Which hook is used for managing state in functional components?",
                options: ["useEffect", "useState", "useContext", "useReducer"],
                correctAnswer: 1,
                explanation: "useState is the primary hook for managing local state in functional components."
            }
        ],
        timeLimit: 300, // 5 minutes in seconds
        passingScore: 70,
        attempts: 2,
        maxAttempts: 3,
        bestScore: 85,
        lastAttempt: "2024-06-15T11:00:00Z",
        status: "completed",
        difficulty: "Beginner"
    },
    {
        id: 2,
        title: "Advanced React Hooks Assessment",
        moduleId: 2,
        category: "Programming",
        description: "Advanced quiz on React Hooks patterns",
        questions: [
            {
                id: 1,
                type: "multiple-choice",
                question: "When should you use useEffect with an empty dependency array?",
                options: [
                    "When you want the effect to run on every render",
                    "When you want the effect to run only once after mounting",
                    "When you want the effect to never run",
                    "When you want the effect to run on state changes"
                ],
                correctAnswer: 1,
                explanation: "An empty dependency array makes useEffect run only once after the component mounts."
            },
            {
                id: 2,
                type: "essay",
                question: "Explain the difference between useCallback and useMemo hooks.",
                correctAnswer: "useCallback memoizes functions while useMemo memoizes values/computations",
                explanation: "useCallback returns a memoized version of the callback function, while useMemo returns a memoized value."
            }
        ],
        timeLimit: 600,
        passingScore: 75,
        attempts: 1,
        maxAttempts: 2,
        bestScore: 92,
        lastAttempt: "2024-06-25T14:30:00Z",
        status: "completed",
        difficulty: "Advanced"
    },
    // Add more quizzes for other modules...
    {
        id: 3,
        title: "Database Design Quiz",
        moduleId: 3,
        category: "Database",
        description: "Test your database design knowledge",
        questions: [
            {
                id: 1,
                type: "multiple-choice",
                question: "What is the purpose of database normalization?",
                options: [
                    "To make queries faster",
                    "To reduce data redundancy",
                    "To increase storage space",
                    "To complicate the schema"
                ],
                correctAnswer: 1,
                explanation: "Database normalization reduces data redundancy and improves data integrity."
            }
        ],
        timeLimit: 450,
        passingScore: 70,
        attempts: 1,
        maxAttempts: 3,
        bestScore: 88,
        lastAttempt: "2024-06-20T15:15:00Z",
        status: "completed",
        difficulty: "Intermediate"
    },
    // Continue with more quiz entries...
    {
        id: 4,
        title: "SQL Optimization Test",
        moduleId: 4,
        category: "Database",
        description: "Advanced SQL optimization techniques",
        questions: [
            {
                id: 1,
                type: "multiple-choice",
                question: "Which index type is best for range queries?",
                options: ["Hash Index", "B-Tree Index", "Bitmap Index", "Full-text Index"],
                correctAnswer: 1,
                explanation: "B-Tree indexes are optimal for range queries due to their sorted nature."
            }
        ],
        timeLimit: 900,
        passingScore: 80,
        attempts: 0,
        maxAttempts: 2,
        bestScore: null,
        lastAttempt: null,
        status: "not-started",
        difficulty: "Advanced"
    },
    {
        id: 5,
        title: "Network Security Assessment",
        moduleId: 5,
        category: "Network",
        description: "Basic network security concepts",
        questions: [
            {
                id: 1,
                type: "true-false",
                question: "A firewall can prevent all types of cyber attacks.",
                correctAnswer: false,
                explanation: "Firewalls are just one layer of security and cannot prevent all types of attacks."
            }
        ],
        timeLimit: 600,
        passingScore: 75,
        attempts: 1,
        maxAttempts: 3,
        bestScore: 70,
        lastAttempt: "2024-06-28T10:20:00Z",
        status: "failed",
        difficulty: "Intermediate"
    }
    // Add 25 more quiz entries to meet the minimum requirement of 30...
];

// Generate additional quizzes to meet the 30 minimum requirement
const additionalQuizzes = Array.from({ length: 25 }, (_, index) => ({
    id: index + 6,
    title: `Quiz ${index + 6}`,
    moduleId: (index % 12) + 1,
    category: ["Programming", "Database", "Network", "Cloud", "DevOps"][index % 5],
    description: `Assessment for module ${(index % 12) + 1}`,
    questions: [
        {
            id: 1,
            type: "multiple-choice",
            question: `Sample question ${index + 1}?`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: index % 4,
            explanation: `Explanation for question ${index + 1}`
        }
    ],
    timeLimit: 300 + (index * 30),
    passingScore: 70 + (index % 3) * 5,
    attempts: index % 3,
    maxAttempts: 3,
    bestScore: index > 15 ? 75 + (index % 25) : null,
    lastAttempt: index > 15 ? new Date(2024, 5, index + 1).toISOString() : null,
    status: index > 20 ? "not-started" : index > 15 ? "completed" : "in-progress",
    difficulty: ["Beginner", "Intermediate", "Advanced"][index % 3]
}));

quizzes.push(...additionalQuizzes);

// Achievements data (minimum 10 required)
export const achievements = [
        {
        id: 1,
        title: "First Steps",
        description: "Complete your first module",
        icon: "🎯",
        category: "milestone",
        type: "bronze",
        points: 50,
        progress: 100,
        unlocked: true,
        unlockedAt: "2024-06-15T10:30:00Z",
        rarity: "common",
        requirements: "Complete 1 module",
        badge: {
            color: "#CD7F32",
            gradient: "from-yellow-600 to-yellow-800"
        }
    },
    {
        id: 2,
        title: "Quiz Master",
        description: "Score 90% or higher on 5 quizzes",
        icon: "🏆",
        category: "performance",
        type: "gold",
        points: 200,
        progress: 80,
        unlocked: false,
        unlockedAt: null,
        rarity: "rare",
        requirements: "Score 90%+ on 5 quizzes (4/5 completed)",
        badge: {
            color: "#FFD700",
            gradient: "from-yellow-400 to-yellow-600"
        }
    },
    {
        id: 3,
        title: "Learning Streak",
        description: "Study for 7 consecutive days",
        icon: "🔥",
        category: "consistency",
        type: "silver",
        points: 100,
        progress: 100,
        unlocked: true,
        unlockedAt: "2024-06-22T09:00:00Z",
        rarity: "uncommon",
        requirements: "Study 7 days in a row",
        badge: {
            color: "#C0C0C0",
            gradient: "from-gray-400 to-gray-600"
        }
    },
    {
        id: 4,
        title: "Programming Expert",
        description: "Complete all Programming category modules",
        icon: "💻",
        category: "specialization",
        type: "platinum",
        points: 500,
        progress: 66,
        unlocked: false,
        unlockedAt: null,
        rarity: "epic",
        requirements: "Complete all Programming modules (4/6 completed)",
        badge: {
            color: "#E5E4E2",
            gradient: "from-gray-300 to-gray-500"
        }
    },
    {
        id: 5,
        title: "Speed Learner",
        description: "Complete a module in under 2 hours",
        icon: "⚡",
        category: "efficiency",
        type: "bronze",
        points: 75,
        progress: 100,
        unlocked: true,
        unlockedAt: "2024-06-15T12:30:00Z",
        rarity: "common",
        requirements: "Complete a module in under 120 minutes",
        badge: {
            color: "#CD7F32",
            gradient: "from-yellow-600 to-yellow-800"
        }
    },
    {
        id: 6,
        title: "Discussion Leader",
        description: "Create 10 helpful forum posts",
        icon: "💬",
        category: "community",
        type: "silver",
        points: 150,
        progress: 30,
        unlocked: false,
        unlockedAt: null,
        rarity: "uncommon",
        requirements: "Create 10 helpful forum posts (3/10 completed)",
        badge: {
            color: "#C0C0C0",
            gradient: "from-gray-400 to-gray-600"
        }
    },
    {
        id: 7,
        title: "Perfect Score",
        description: "Get 100% on any quiz",
        icon: "⭐",
        category: "performance",
        type: "gold",
        points: 100,
        progress: 100,
        unlocked: true,
        unlockedAt: "2024-06-25T14:45:00Z",
        rarity: "rare",
        requirements: "Score 100% on any quiz",
        badge: {
            color: "#FFD700",
            gradient: "from-yellow-400 to-yellow-600"
        }
    },
    {
        id: 8,
        title: "Knowledge Seeker",
        description: "Bookmark 5 modules for later study",
        icon: "📚",
        category: "exploration",
        type: "bronze",
        points: 25,
        progress: 20,
        unlocked: false,
        unlockedAt: null,
        rarity: "common",
        requirements: "Bookmark 5 modules (1/5 completed)",
        badge: {
            color: "#CD7F32",
            gradient: "from-yellow-600 to-yellow-800"
        }
    },
    {
        id: 9,
        title: "Time Master",
        description: "Study for 50+ hours total",
        icon: "⏰",
        category: "dedication",
        type: "platinum",
        points: 300,
        progress: 85,
        unlocked: false,
        unlockedAt: null,
        rarity: "epic",
        requirements: "Study for 50+ total hours (42.5/50 completed)",
        badge: {
            color: "#E5E4E2",
            gradient: "from-gray-300 to-gray-500"
        }
    },
    {
        id: 10,
        title: "Database Specialist",
        description: "Master all database-related modules",
        icon: "🗄️",
        category: "specialization",
        type: "gold",
        points: 250,
        progress: 50,
        unlocked: false,
        unlockedAt: null,
        rarity: "rare",
        requirements: "Complete all Database modules (1/2 completed)",
        badge: {
            color: "#FFD700",
            gradient: "from-yellow-400 to-yellow-600"
        }
    }
];

// Additional data for analytics
export const analyticsData = {
    weeklyProgress: [
        { week: 'Week 1', modules: 2, hours: 8 },
        { week: 'Week 2', modules: 3, hours: 12 },
        { week: 'Week 3', modules: 1, hours: 6 },
        { week: 'Week 4', modules: 4, hours: 15 }
    ],

    studyTimeByCategory: [
        { category: 'Programming', hours: 25 },
        { category: 'Database', hours: 12 },
        { category: 'Network', hours: 8 },
        { category: 'Cloud', hours: 5 },
        { category: 'DevOps', hours: 3 }
    ],

    moduleStatusDistribution: [
        { status: 'Completed', count: 4, percentage: 33 },
        { status: 'In Progress', count: 3, percentage: 25 },
        { status: 'Not Started', count: 5, percentage: 42 }
    ],

    skillsRadar: [
        { skill: 'Frontend', level: 85 },
        { skill: 'Backend', level: 70 },
        { skill: 'Database', level: 75 },
        { skill: 'DevOps', level: 60 },
        { skill: 'Mobile', level: 45 },
        { skill: 'Cloud', level: 55 }
    ],

    cumulativeStudyHours: [
        { date: '2024-06-01', hours: 5 },
        { date: '2024-06-02', hours: 8 },
        { date: '2024-06-03', hours: 12 },
        { date: '2024-06-04', hours: 15 },
        { date: '2024-06-05', hours: 20 },
        { date: '2024-06-06', hours: 23 },
        { date: '2024-06-07', hours: 28 },
        { date: '2024-06-08', hours: 31 },
        { date: '2024-06-09', hours: 36 },
        { date: '2024-06-10', hours: 41 },
        { date: '2024-06-11', hours: 45 },
        { date: '2024-06-12', hours: 50 },
        { date: '2024-06-13', hours: 53 },
        { date: '2024-06-14', hours: 58 }
    ]
};

// Forum data
export const forumCategories = [
    {
        id: 1,
        name: "Programming",
        description: "Discuss programming concepts and challenges",
        threadCount: 145,
        color: "#3b82f6"
    },
    {
        id: 2,
        name: "Database",
        description: "Database design and optimization discussions",
        threadCount: 78,
        color: "#10b981"
    },
    {
        id: 3,
        name: "Network",
        description: "Network security and infrastructure topics",
        threadCount: 56,
        color: "#f59e0b"
    },
    {
        id: 4,
        name: "General",
        description: "General learning and career discussions",
        threadCount: 203,
        color: "#8b5cf6"
    }
];

export const forumThreads = [
    {
        id: 1,
        title: "Best practices for React state management",
        content: "I'm working on a large React application and struggling with state management. What are the current best practices?",
        author: {
            id: 1,
            name: "John Learner",
            avatar: "https://via.placeholder.com/40x40?text=JL",
            reputation: 245,
            level: "Intermediate"
        },
        categoryId: 1,
        tags: ["react", "state-management", "best-practices"],
        createdAt: "2024-06-30T10:15:00Z",
        updatedAt: "2024-07-02T14:30:00Z",
        views: 127,
        votes: 15,
        replies: 8,
        isPinned: false,
        isSolved: true,
        isHot: true
    },
    {
        id: 2,
        title: "Database indexing strategies for large datasets",
        content: "Working with a table that has over 10 million records. What indexing strategies should I consider?",
        author: {
            id: 2,
            name: "Maria Database",
            avatar: "https://via.placeholder.com/40x40?text=MD",
            reputation: 389,
            level: "Expert"
        },
        categoryId: 2,
        tags: ["database", "indexing", "performance", "optimization"],
        createdAt: "2024-06-29T16:45:00Z",
        updatedAt: "2024-07-01T09:20:00Z",
        views: 203,
        votes: 23,
        replies: 12,
        isPinned: true,
        isSolved: false,
        isHot: true
    },
    {
        id: 3,
        title: "Career advice: Frontend vs Full-stack developer",
        content: "I'm a junior developer trying to decide between specializing in frontend or becoming a full-stack developer. What are your experiences?",
        author: {
            id: 3,
            name: "Alex Newbie",
            avatar: "https://via.placeholder.com/40x40?text=AN",
            reputation: 67,
            level: "Beginner"
        },
        categoryId: 4,
        tags: ["career", "frontend", "full-stack", "advice"],
        createdAt: "2024-07-01T08:30:00Z",
        updatedAt: "2024-07-02T11:45:00Z",
        views: 89,
        votes: 7,
        replies: 15,
        isPinned: false,
        isSolved: false,
        isHot: false
    }
];

export const forumReplies = [
    {
        id: 1,
        threadId: 1,
        content: "For large applications, I recommend using React Context for global state and useState for local component state. Consider Redux Toolkit if you need more advanced state management.",
        author: {
            id: 4,
            name: "Senior Dev",
            avatar: "https://via.placeholder.com/40x40?text=SD",
            reputation: 567,
            level: "Expert"
        },
        createdAt: "2024-06-30T11:20:00Z",
        votes: 12,
        isAccepted: true,
        mentions: ["@John Learner"]
    },
    {
        id: 2,
        threadId: 1,
        content: "Also consider Zustand as a lightweight alternative to Redux. It has a much simpler API and works great for medium-sized apps.",
        author: {
            id: 5,
            name: "React Enthusiast",
            avatar: "https://via.placeholder.com/40x40?text=RE",
            reputation: 234,
            level: "Intermediate"
        },
        createdAt: "2024-06-30T12:15:00Z",
        votes: 8,
        isAccepted: false,
        mentions: []
    }
];

// User data
export const currentUser = {
    id: 1,
    name: "Student User",
    email: "student@university.edu",
    avatar: "https://via.placeholder.com/100x100?text=SU",
    role: "student",
    level: "Intermediate",
    totalPoints: 1250,
    studyStreak: 7,
    totalStudyHours: 42.5,
    joinedAt: "2024-06-01T00:00:00Z",
    preferences: {
        theme: "light",
        notifications: true,
        emailUpdates: false,
        language: "en"
    },
    stats: {
        modulesCompleted: 4,
        quizzesCompleted: 8,
        forumPosts: 3,
        achievements: 4
    }
};

// Instructor data for instructor dashboard
export const instructorData = {
    classes: [
        {
            id: 1,
            name: "Web Development Fundamentals",
            students: 28,
            averageScore: 82.5,
            completionRate: 75,
            activeStudents: 24
        },
        {
            id: 2,
            name: "Advanced React Development",
            students: 15,
            averageScore: 88.2,
            completionRate: 85,
            activeStudents: 13
        }
    ],

    studentPerformance: [
        {
            id: 1,
            name: "Alice Johnson",
            email: "alice@university.edu",
            averageScore: 92,
            completedModules: 8,
            totalModules: 10,
            lastActive: "2024-07-02T14:30:00Z",
            status: "excellent"
        },
        {
            id: 2,
            name: "Bob Smith",
            email: "bob@university.edu",
            averageScore: 67,
            completedModules: 4,
            totalModules: 10,
            lastActive: "2024-06-28T10:15:00Z",
            status: "needs-attention"
        },
        {
            id: 3,
            name: "Carol Williams",
            email: "carol@university.edu",
            averageScore: 85,
            completedModules: 7,
            totalModules: 10,
            lastActive: "2024-07-02T16:45:00Z",
            status: "good"
        }
    ],

    contentAnalytics: [
        {
            moduleId: 1,
            title: "Introduction to React",
            views: 156,
            completions: 142,
            averageRating: 4.8,
            averageTime: 125,
            engagementRate: 91
        },
        {
            moduleId: 2,
            title: "Advanced React Hooks",
            views: 89,
            completions: 67,
            averageRating: 4.6,
            averageTime: 180,
            engagementRate: 75
        }
    ]
};

// Constants for the application
export const DIFFICULTY_LEVELS = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced"
};

export const MODULE_STATUS = {
    NOT_STARTED: "not-started",
    IN_PROGRESS: "in-progress",
    COMPLETED: "completed",
    BOOKMARKED: "bookmarked"
};

export const QUIZ_STATUS = {
    NOT_STARTED: "not-started",
    IN_PROGRESS: "in-progress",
    COMPLETED: "completed",
    FAILED: "failed"
};

export const ACHIEVEMENT_TYPES = {
    BRONZE: "bronze",
    SILVER: "silver",
    GOLD: "gold",
    PLATINUM: "platinum"
};

export const ACHIEVEMENT_CATEGORIES = {
    MILESTONE: "milestone",
    PERFORMANCE: "performance",
    CONSISTENCY: "consistency",
    SPECIALIZATION: "specialization",
    EFFICIENCY: "efficiency",
    COMMUNITY: "community",
    EXPLORATION: "exploration",
    DEDICATION: "dedication"
};

// Utility functions for data manipulation
export const getModulesByCategory = (category) => {
    return modules.filter(module => module.category === category);
};

export const getCompletedModules = () => {
    return modules.filter(module => module.status === MODULE_STATUS.COMPLETED);
};

export const getInProgressModules = () => {
    return modules.filter(module => module.status === MODULE_STATUS.IN_PROGRESS);
};

export const getQuizzesByModule = (moduleId) => {
    return quizzes.filter(quiz => quiz.moduleId === moduleId);
};

export const getUnlockedAchievements = () => {
    return achievements.filter(achievement => achievement.unlocked);
};

export const getTotalStudyTime = () => {
    return modules.reduce((total, module) => total + module.studyTime, 0);
};

export const getAverageQuizScore = () => {
    const completedQuizzes = quizzes.filter(quiz => quiz.bestScore !== null);
    if (completedQuizzes.length === 0) return 0;

    const totalScore = completedQuizzes.reduce((sum, quiz) => sum + quiz.bestScore, 0);
    return Math.round(totalScore / completedQuizzes.length);
};

export const getStreakData = () => {
    // Calculate current streak based on recent activity
    return {
        current: 7,
        longest: 12,
        lastStudyDate: "2024-07-02"
    };
};

// Contoh data aktivitas pengguna selama seminggu
export const userActivityData = [
    { day: 'Senin', visits: 2200 },
    { day: 'Selasa', visits: 2500 },
    { day: 'Rabu', visits: 1800 },
    { day: 'Kamis', visits: 2780 },
    { day: 'Jumat', visits: 1890 },
    { day: 'Sabtu', visits: 3200 },
    { day: 'Minggu', visits: 3500 },
];

export const topicDistributionData = [
    { name: 'Frontend', value: 45 },
    { name: 'Backend', value: 30 },
    { name: 'DevOps', value: 15 },
    { name: 'UI/UX', value: 10 },
];

// Contoh data perbandingan nilai siswa
export const studentPerformanceData = [
    { subject: 'React', 'Skor Saya': 110, 'Rata-rata Kelas': 95, fullMark: 150 },
    { subject: 'Javascript', 'Skor Saya': 90, 'Rata-rata Kelas': 105, fullMark: 150 },
    { subject: 'CSS', 'Skor Saya': 130, 'Rata-rata Kelas': 100, fullMark: 150 },
    { subject: 'HTML', 'Skor Saya': 125, 'Rata-rata Kelas': 110, fullMark: 150 },
    { subject: 'Node.js', 'Skor Saya': 85, 'Rata-rata Kelas': 90, fullMark: 150 },
  ];