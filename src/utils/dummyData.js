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
    ],

    // Performa kuis, sekarang menggunakan judul kuis yang sebenarnya
    quizPerformance: [
      { name: quizzes[0].title, score: 95 }, // Dasar React
      { name: quizzes[1].title, score: 88 }, // Advanced Hooks
      { name: quizzes[2].title, score: 82 }, // State Management
      { name: quizzes[3].title, score: 91 }, // React Testing
      { name: quizzes[4].title, score: 79 }, // Performance Optimization
    ],
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
    },
    {
        id: 5,
        name: "React",
        description: "React.js framework discussions, tips, and best practices",
        threadCount: 89,
        color: "#61dafb"
    },
    {
        id: 6,
        name: "CSS",
        description: "CSS styling, layouts, animations, and design techniques",
        threadCount: 67,
        color: "#264de4"
    },
    {
        id: 7,
        name: "Frontend",
        description: "Frontend development, UI/UX, and client-side technologies",
        threadCount: 112,
        color: "#ff6b6b"
    },
    {
        id: 8,
        name: "Backend",
        description: "Server-side development, APIs, and backend technologies",
        threadCount: 94,
        color: "#4ecdc4"
    },
    {
        id: 9,
        name: "Mobile",
        description: "Mobile app development for iOS, Android, and cross-platform",
        threadCount: 73,
        color: "#a8e6cf"
    },
    {
        id: 10,
        name: "DevOps",
        description: "DevOps practices, CI/CD, deployment, and infrastructure",
        threadCount: 58,
        color: "#ff9ff3"
    }
];

export const forumThreads = [
    {
        id: 1,
        title: "Best practices for React state management",
        excerpt: "With the evolution of server components and new hooks, the landscape is changing. Let's discuss the pros and cons of Zustand, Jotai, Redux, and native Context.",
        content: "I'm working on a large React application and struggling with state management. What are the current best practices?",
        author: {
            id: 1,
            name: "John Learner",
            avatar: "https://i.pravatar.cc/150?u=1",
            reputation: 245,
            level: "Intermediate",
            badge: "silver"
        },
        lastReply: {
            author: "Marcus Chen",
            timestamp: "2025-07-04T18:45:00Z"
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
        excerpt: "Looking for advice on indexing a table with over 10 million records. What works best for performance?",
        content: "Working with a table that has over 10 million records. What indexing strategies should I consider?",
        author: {
            id: 2,
            name: "Maria Database",
            avatar: "https://i.pravatar.cc/150?u=1",
            reputation: 389,
            level: "Expert",
            badge: "gold"
        },
        lastReply: {
            author: "Fatima Zahra",
            timestamp: "2025-07-03T16:10:00Z"
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
        excerpt: "Should I specialize in frontend or go full-stack? Looking for experiences and recommendations.",
        content: "I'm a junior developer trying to decide between specializing in frontend or becoming a full-stack developer. What are your experiences?",
        author: {
            id: 3,
            name: "Alex Newbie",
            avatar: "https://i.pravatar.cc/150?u=1",
            reputation: 67,
            level: "Beginner",
            badge: "platinum"
        },
        lastReply: {
            author: "Ben Carter",
            timestamp: "2025-07-02T20:30:00Z"
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

export const forumThreadDetail = {
    thread1: {
        id: '1',
        title: 'Best practices for React state management in 2025?',
        author: { id: 'user2', name: 'Jane Doe', avatar: 'https://placehold.co/100x100/FBCFE8/9D27B0?text=J', points: 800, badge: 'React Guru' },
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        tags: ['react', 'state-management', 'zustand'],
        upvotes: 25,
        isPinned: true,
        isSolved: false,
        content: "I'm starting a new large-scale project and I'm debating between using Redux Toolkit, Zustand, or just relying on React Context. The project will have complex state requirements including user authentication, real-time data, and offline capabilities. What are the current best practices for 2025?",
        replies: [
            { id: 'reply1', parentId: null, author: { id: 'user4', name: 'Mike Lee', avatar: 'https://placehold.co/100x100/C7D2FE/4338CA?text=M', points: 450, badge: 'Helper' }, content: "Zustand is great for simplicity and has excellent TypeScript support. For your use case, I'd recommend Zustand with React Query for server state.", createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
            { id: 'reply2', parentId: 'reply1', author: { id: 'user1', name: 'Javier Fadel', avatar: 'https://placehold.co/100x100/DBEAFE/1E40AF?text=JF', points: 1250, badge: 'Top Contributor' }, content: "@Mike Lee I agree! It scales surprisingly well. I've used it in production with 100k+ users and it performs great.", createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString() },
            { id: 'reply3', parentId: null, author: { id: 'user6', name: 'Sarah Wilson', avatar: 'https://placehold.co/100x100/FEF3C7/F59E0B?text=SW', points: 920, badge: 'React Expert' }, content: "Consider Redux Toolkit if you need time-travel debugging or have a team already familiar with Redux patterns.", createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString() }
        ]
    },
    thread2: {
        id: '2',
        title: 'Database indexing strategies for large datasets',
        author: { id: 'user3', name: 'Maria Database', avatar: 'https://placehold.co/100x100/D1FAE5/059669?text=MD', points: 389, badge: 'Database Expert' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        tags: ['database', 'indexing', 'performance', 'optimization'],
        upvotes: 23,
        isPinned: true,
        isSolved: false,
        content: "Working with a table that has over 10 million records. The table has columns for user_id, created_at, status, and category. What indexing strategies should I consider for optimal query performance?",
        replies: [
            { id: 'reply1', parentId: null, author: { id: 'user7', name: 'Fatima Zahra', avatar: 'https://placehold.co/100x100/EDE9FE/7C3AED?text=FZ', points: 678, badge: 'Performance Guru' }, content: "Start with a composite index on (user_id, created_at) since you'll likely query by user and date range. Also consider partial indexes for status if it has low cardinality.", createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString() },
            { id: 'reply2', parentId: 'reply1', author: { id: 'user8', name: 'David Chen', avatar: 'https://placehold.co/100x100/FEE2E2/DC2626?text=DC', points: 445, badge: 'Helper' }, content: "@Fatima Zahra Great advice! Also consider covering indexes if you're frequently selecting specific columns.", createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString() }
        ]
    },
    thread3: {
        id: '3',
        title: 'Career advice: Frontend vs Full-stack developer',
        author: { id: 'user9', name: 'Alex Newbie', avatar: 'https://placehold.co/100x100/E0E7FF/3730A3?text=AN', points: 67, badge: 'Newcomer' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        tags: ['career', 'frontend', 'full-stack', 'advice'],
        upvotes: 7,
        isPinned: false,
        isSolved: false,
        content: "I'm a junior developer trying to decide between specializing in frontend or becoming a full-stack developer. I enjoy both UI work and backend logic. What are your experiences and recommendations?",
        replies: [
            { id: 'reply1', parentId: null, author: { id: 'user10', name: 'Ben Carter', avatar: 'https://placehold.co/100x100/FEF3C7/F59E0B?text=BC', points: 756, badge: 'Senior Dev' }, content: "Start with frontend specialization to build a strong foundation, then gradually expand to backend. Full-stack knowledge is valuable but frontend expertise is highly sought after.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
            { id: 'reply2', parentId: 'reply1', author: { id: 'user11', name: 'Lisa Anderson', avatar: 'https://placehold.co/100x100/ECFDF5/047857?text=LA', points: 892, badge: 'Tech Lead' }, content: "@Ben Carter Agreed! Also consider the market demand in your area. Frontend specialists often have more remote opportunities.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
            { id: 'reply3', parentId: null, author: { id: 'user12', name: 'Tom Rodriguez', avatar: 'https://placehold.co/100x100/FEE2E2/DC2626?text=TR', points: 334, badge: 'Helper' }, content: "Don't forget about DevOps skills too! Understanding deployment and CI/CD is valuable regardless of your specialization.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString() }
        ]
    },
    thread4: {
        id: '4',
        title: 'SQL Query Optimization Techniques',
        author: { id: 'user13', name: 'Elena Petrova', avatar: 'https://placehold.co/100x100/DBEAFE/1E40AF?text=EP', points: 567, badge: 'Database Admin' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        tags: ['sql', 'optimization', 'performance', 'database'],
        upvotes: 18,
        isPinned: false,
        isSolved: true,
        content: "What are the most effective techniques for optimizing slow SQL queries? I'm dealing with complex joins and subqueries that are taking too long to execute.",
        replies: [
            { id: 'reply1', parentId: null, author: { id: 'user14', name: 'Kevin Wilson', avatar: 'https://placehold.co/100x100/FEF3C7/F59E0B?text=KW', points: 723, badge: 'Performance Expert' }, content: "First, use EXPLAIN to analyze query plans. Look for table scans and consider adding indexes. Also, avoid SELECT * and use specific columns.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
            { id: 'reply2', parentId: 'reply1', author: { id: 'user15', name: 'Nina Patel', avatar: 'https://placehold.co/100x100/EDE9FE/7C3AED?text=NP', points: 456, badge: 'Helper' }, content: "@Kevin Wilson Great points! Also consider query rewriting to eliminate unnecessary subqueries and use window functions where appropriate.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() }
        ]
    },
    thread5: {
        id: '5',
        title: 'React Native vs Flutter for Cross-Platform Development',
        author: { id: 'user16', name: 'Sofia Rossi', avatar: 'https://placehold.co/100x100/FEE2E2/DC2626?text=SR', points: 445, badge: 'Mobile Dev' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        tags: ['mobile', 'react-native', 'flutter', 'cross-platform'],
        upvotes: 31,
        isPinned: false,
        isSolved: false,
        content: "I need to choose between React Native and Flutter for a new mobile app project. The app will have complex UI animations and real-time features. Which platform would you recommend?",
        replies: [
            { id: 'reply1', parentId: null, author: { id: 'user17', name: 'Hiro Tanaka', avatar: 'https://placehold.co/100x100/D1FAE5/059669?text=HT', points: 678, badge: 'Mobile Expert' }, content: "Flutter has better performance for animations and a more consistent UI across platforms. React Native is better if your team already knows React.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString() },
            { id: 'reply2', parentId: 'reply1', author: { id: 'user18', name: 'Carlos Mendez', avatar: 'https://placehold.co/100x100/E0E7FF/3730A3?text=CM', points: 389, badge: 'Helper' }, content: "@Hiro Tanaka I agree! Also consider the ecosystem - React Native has more third-party libraries, but Flutter's built-in widgets are more polished.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString() }
        ]
    },
    thread6: {
        id: '6',
        title: 'Docker Best Practices for Production',
        author: { id: 'user19', name: 'Liam O\'Connor', avatar: 'https://placehold.co/100x100/FEF3C7/F59E0B?text=LO', points: 567, badge: 'DevOps Engineer' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
        tags: ['docker', 'devops', 'production', 'best-practices'],
        upvotes: 22,
        isPinned: false,
        isSolved: false,
        content: "What are the essential Docker best practices for production deployments? I'm setting up containers for a Node.js application with Redis and PostgreSQL.",
        replies: [
            { id: 'reply1', parentId: null, author: { id: 'user20', name: 'Priya Patel', avatar: 'https://placehold.co/100x100/ECFDF5/047857?text=PP', points: 789, badge: 'Cloud Architect' }, content: "Use multi-stage builds to reduce image size, run containers as non-root users, and implement health checks. Also consider using Docker Compose for local development.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString() },
            { id: 'reply2', parentId: 'reply1', author: { id: 'user21', name: 'Marcus Chen', avatar: 'https://placehold.co/100x100/DBEAFE/1E40AF?text=MC', points: 634, badge: 'Helper' }, content: "@Priya Patel Don't forget to set resource limits and use .dockerignore to exclude unnecessary files from the build context.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() }
        ]
    },
    thread7: {
        id: '7',
        title: 'AWS Lambda Cold Start Optimization',
        author: { id: 'user22', name: 'Aisha Khan', avatar: 'https://placehold.co/100x100/EDE9FE/7C3AED?text=AK', points: 456, badge: 'Cloud Specialist' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        tags: ['aws', 'lambda', 'serverless', 'performance'],
        upvotes: 19,
        isPinned: false,
        isSolved: true,
        content: "How can I minimize cold start times for AWS Lambda functions? My functions are taking 2-3 seconds to start, which is affecting user experience.",
        replies: [
            { id: 'reply1', parentId: null, author: { id: 'user23', name: 'Robert Taylor', avatar: 'https://placehold.co/100x100/FEE2E2/DC2626?text=RT', points: 567, badge: 'AWS Expert' }, content: "Use provisioned concurrency for critical functions, keep dependencies minimal, and consider using Lambda Extensions for initialization tasks.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString() },
            { id: 'reply2', parentId: 'reply1', author: { id: 'user24', name: 'Emily Davis', avatar: 'https://placehold.co/100x100/D1FAE5/059669?text=ED', points: 445, badge: 'Helper' }, content: "@Robert Taylor Also consider using Lambda SnapStart for Java functions and keeping your deployment package under 50MB.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString() }
        ]
    },
    thread8: {
        id: '8',
        title: 'TypeScript vs JavaScript for Large Projects',
        author: { id: 'user25', name: 'Chris Martinez', avatar: 'https://placehold.co/100x100/E0E7FF/3730A3?text=CM', points: 334, badge: 'Developer' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
        tags: ['typescript', 'javascript', 'development', 'best-practices'],
        upvotes: 28,
        isPinned: false,
        isSolved: false,
        content: "My team is debating whether to migrate our large JavaScript codebase to TypeScript. What are the pros and cons, and is it worth the effort?",
        replies: [
            { id: 'reply1', parentId: null, author: { id: 'user26', name: 'Dr. Evelyn Reed', avatar: 'https://placehold.co/100x100/FEF3C7/F59E0B?text=ER', points: 890, badge: 'Tech Lead' }, content: "TypeScript provides better IDE support, catches errors at compile time, and improves code maintainability. The migration effort is worth it for large projects.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 13).toISOString() },
            { id: 'reply2', parentId: 'reply1', author: { id: 'user27', name: 'Alex Thompson', avatar: 'https://placehold.co/100x100/ECFDF5/047857?text=AT', points: 567, badge: 'Helper' }, content: "@Dr. Evelyn Reed Start with gradual migration using allowJs and strict: false, then gradually enable stricter settings.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() }
        ]
    },
    thread9: {
        id: '9',
        title: 'GraphQL vs REST API Design',
        author: { id: 'user28', name: 'Lisa Anderson', avatar: 'https://placehold.co/100x100/DBEAFE/1E40AF?text=LA', points: 678, badge: 'API Specialist' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
        tags: ['graphql', 'rest', 'api', 'design'],
        upvotes: 35,
        isPinned: false,
        isSolved: false,
        content: "When designing a new API, should I choose GraphQL or REST? The API will serve multiple client applications with different data requirements.",
        replies: [
            { id: 'reply1', parentId: null, author: { id: 'user29', name: 'Ben Carter', avatar: 'https://placehold.co/100x100/FEE2E2/DC2626?text=BC', points: 756, badge: 'Senior Dev' }, content: "GraphQL is great for flexible data fetching and reducing over-fetching/under-fetching. REST is simpler to implement and has better caching. Consider your team's expertise.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString() },
            { id: 'reply2', parentId: 'reply1', author: { id: 'user30', name: 'Maria Garcia', avatar: 'https://placehold.co/100x100/EDE9FE/7C3AED?text=MG', points: 445, badge: 'Helper' }, content: "@Ben Carter Also consider that GraphQL has a steeper learning curve but provides better developer experience for complex data relationships.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString() }
        ]
    },
    thread10: {
        id: '10',
        title: 'Microservices vs Monolith Architecture',
        author: { id: 'user31', name: 'Kevin Wilson', avatar: 'https://placehold.co/100x100/D1FAE5/059669?text=KW', points: 723, badge: 'Architecture Expert' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        tags: ['microservices', 'monolith', 'architecture', 'scalability'],
        upvotes: 42,
        isPinned: true,
        isSolved: false,
        content: "Our startup is growing and considering whether to break our monolith into microservices. What are the trade-offs and when is the right time to make this transition?",
        replies: [
            { id: 'reply1', parentId: null, author: { id: 'user32', name: 'Hiro Tanaka', avatar: 'https://placehold.co/100x100/FEF3C7/F59E0B?text=HT', points: 678, badge: 'DevOps Specialist' }, content: "Start with a monolith and only break into microservices when you have clear bounded contexts and the complexity justifies the overhead. Premature microservices can be a disaster.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 17).toISOString() },
            { id: 'reply2', parentId: 'reply1', author: { id: 'user33', name: 'Elena Petrova', avatar: 'https://placehold.co/100x100/ECFDF5/047857?text=EP', points: 567, badge: 'Helper' }, content: "@Hiro Tanaka Agreed! Also consider your team size and deployment infrastructure. Microservices require more operational complexity.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString() }
        ]
    }
};

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

export const instructors = [
    {
        id: 1,
        name: 'Dr. Evelyn Reed',
        title: 'Lead Data Scientist',
        avatar: 'https://i.pravatar.cc/150?u=1',
        rating: 4.9,
        courses: 12,
        bio: 'Specializes in machine learning and statistical modeling with over a decade of industry experience.'
    },
    {
        id: 2,
        name: 'Marcus Chen',
        title: 'Senior Frontend Developer',
        avatar: 'https://i.pravatar.cc/150?u=2',
        rating: 4.8,
        courses: 8,
        bio: 'Expert in React, Next.js, and modern web architecture. Passionate about creating seamless user experiences.'
    },
    {
        id: 3,
        name: 'Aisha Khan',
        title: 'Cybersecurity Analyst',
        avatar: 'https://i.pravatar.cc/150?u=3',
        rating: 4.9,
        courses: 5,
        bio: 'Focused on ethical hacking and network security. Holds multiple certifications in threat analysis.'
    },
    {
        id: 4,
        name: 'Ben Carter',
        title: 'UX/UI Design Lead',
        avatar: 'https://i.pravatar.cc/150?u=4',
        rating: 4.7,
        courses: 7,
        bio: 'Transforms complex problems into beautiful and intuitive designs. Master of Figma and user-centered design.'
    },
    {
        id: 5,
        name: 'Priya Patel',
        title: 'Cloud Solutions Architect',
        avatar: 'https://i.pravatar.cc/150?u=5',
        rating: 4.8,
        courses: 10,
        bio: 'Designs scalable cloud infrastructure and specializes in AWS and Azure deployments.'
    },
    {
        id: 6,
        name: 'Liam O\'Connor',
        title: 'Full Stack Developer',
        avatar: 'https://i.pravatar.cc/150?u=6',
        rating: 4.6,
        courses: 9,
        bio: 'Experienced in both frontend and backend technologies, with a focus on Node.js and React.'
    },
    {
        id: 7,
        name: 'Sofia Rossi',
        title: 'Mobile App Engineer',
        avatar: 'https://i.pravatar.cc/150?u=7',
        rating: 4.7,
        courses: 6,
        bio: 'Builds high-performance mobile apps using React Native and Flutter.'
    },
    {
        id: 8,
        name: 'Hiro Tanaka',
        title: 'DevOps Specialist',
        avatar: 'https://i.pravatar.cc/150?u=8',
        rating: 4.9,
        courses: 11,
        bio: 'Automates CI/CD pipelines and infrastructure as code for rapid software delivery.'
    },
    {
        id: 9,
        name: 'Elena Petrova',
        title: 'Database Administrator',
        avatar: 'https://i.pravatar.cc/150?u=9',
        rating: 4.8,
        courses: 7,
        bio: 'Expert in SQL and NoSQL databases, focusing on performance tuning and security.'
    },
    {
        id: 10,
        name: 'Carlos Mendez',
        title: 'Network Engineer',
        avatar: 'https://i.pravatar.cc/150?u=10',
        rating: 4.7,
        courses: 8,
        bio: 'Designs and maintains secure, high-availability network infrastructures.'
    }
];

// Instructor data for instructor dashboard
export const singleInstructorDashboardData = {
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

// User dummy data
export const users = [
    {
        id: 1,
        name: "Javier Fadel",
        email: "javier.fadel@university.edu",
        avatar: "https://placehold.co/100x100/DBEAFE/1E40AF?text=JF",
        role: "student",
        level: "Advanced",
        totalPoints: 1250,
        studyStreak: 12,
        totalStudyHours: 67.5,
        joinedAt: "2024-01-15T00:00:00Z",
        reputation: 1250,
        badge: "Top Contributor",
        preferences: {
            theme: "dark",
            notifications: true,
            emailUpdates: true,
            language: "en"
        },
        stats: {
            modulesCompleted: 8,
            quizzesCompleted: 15,
            forumPosts: 23,
            achievements: 7
        },
        bio: "Passionate full-stack developer with expertise in React and Node.js. Always eager to help others learn and grow.",
        lastActive: "2024-07-04T18:30:00Z",
        status: "active"
    },
    {
        id: 2,
        name: "Jane Doe",
        email: "jane.doe@techcorp.com",
        avatar: "https://placehold.co/100x100/FBCFE8/9D27B0?text=JD",
        role: "instructor",
        level: "Expert",
        totalPoints: 800,
        studyStreak: 0,
        totalStudyHours: 0,
        joinedAt: "2023-08-20T00:00:00Z",
        reputation: 800,
        badge: "React Guru",
        preferences: {
            theme: "light",
            notifications: true,
            emailUpdates: false,
            language: "en"
        },
        stats: {
            modulesCompleted: 0,
            quizzesCompleted: 0,
            forumPosts: 45,
            achievements: 12
        },
        bio: "Senior React developer with 8+ years of experience. Specializes in state management and performance optimization.",
        lastActive: "2024-07-04T16:45:00Z",
        status: "active",
        title: "Senior React Developer",
        rating: 4.9,
        courses: 8
    },
    {
        id: 3,
        name: "Maria Database",
        email: "maria.database@datatech.com",
        avatar: "https://placehold.co/100x100/D1FAE5/059669?text=MD",
        role: "instructor",
        level: "Expert",
        totalPoints: 389,
        studyStreak: 0,
        totalStudyHours: 0,
        joinedAt: "2023-11-10T00:00:00Z",
        reputation: 389,
        badge: "Database Expert",
        preferences: {
            theme: "light",
            notifications: true,
            emailUpdates: true,
            language: "en"
        },
        stats: {
            modulesCompleted: 0,
            quizzesCompleted: 0,
            forumPosts: 67,
            achievements: 9
        },
        bio: "Database architect with expertise in PostgreSQL, MySQL, and NoSQL solutions. Performance tuning specialist.",
        lastActive: "2024-07-03T14:20:00Z",
        status: "active",
        title: "Database Architect",
        rating: 4.8,
        courses: 5
    },
    {
        id: 4,
        name: "Mike Lee",
        email: "mike.lee@startup.io",
        avatar: "https://placehold.co/100x100/C7D2FE/4338CA?text=ML",
        role: "student",
        level: "Intermediate",
        totalPoints: 450,
        studyStreak: 5,
        totalStudyHours: 28.3,
        joinedAt: "2024-03-05T00:00:00Z",
        reputation: 450,
        badge: "Helper",
        preferences: {
            theme: "light",
            notifications: false,
            emailUpdates: false,
            language: "en"
        },
        stats: {
            modulesCompleted: 5,
            quizzesCompleted: 12,
            forumPosts: 18,
            achievements: 3
        },
        bio: "Frontend developer learning React and modern web technologies. Enjoys helping others solve coding challenges.",
        lastActive: "2024-07-04T12:15:00Z",
        status: "active"
    },
    {
        id: 5,
        name: "Sarah Wilson",
        email: "sarah.wilson@webdev.com",
        avatar: "https://placehold.co/100x100/FEF3C7/F59E0B?text=SW",
        role: "instructor",
        level: "Expert",
        totalPoints: 920,
        studyStreak: 0,
        totalStudyHours: 0,
        joinedAt: "2023-09-15T00:00:00Z",
        reputation: 920,
        badge: "React Expert",
        preferences: {
            theme: "dark",
            notifications: true,
            emailUpdates: true,
            language: "en"
        },
        stats: {
            modulesCompleted: 0,
            quizzesCompleted: 0,
            forumPosts: 89,
            achievements: 15
        },
        bio: "React consultant and trainer. Author of several popular React courses and technical articles.",
        lastActive: "2024-07-04T17:30:00Z",
        status: "active",
        title: "React Consultant",
        rating: 4.9,
        courses: 12
    },
    {
        id: 6,
        name: "Alex Newbie",
        email: "alex.newbie@student.edu",
        avatar: "https://placehold.co/100x100/E0E7FF/3730A3?text=AN",
        role: "student",
        level: "Beginner",
        totalPoints: 67,
        studyStreak: 3,
        totalStudyHours: 12.5,
        joinedAt: "2024-06-01T00:00:00Z",
        reputation: 67,
        badge: "Newcomer",
        preferences: {
            theme: "light",
            notifications: true,
            emailUpdates: true,
            language: "en"
        },
        stats: {
            modulesCompleted: 2,
            quizzesCompleted: 4,
            forumPosts: 7,
            achievements: 1
        },
        bio: "Junior developer just starting my journey in web development. Excited to learn and grow with the community.",
        lastActive: "2024-07-04T10:45:00Z",
        status: "active"
    },
    {
        id: 7,
        name: "Fatima Zahra",
        email: "fatima.zahra@perftech.com",
        avatar: "https://placehold.co/100x100/EDE9FE/7C3AED?text=FZ",
        role: "instructor",
        level: "Expert",
        totalPoints: 678,
        studyStreak: 0,
        totalStudyHours: 0,
        joinedAt: "2023-12-01T00:00:00Z",
        reputation: 678,
        badge: "Performance Guru",
        preferences: {
            theme: "light",
            notifications: true,
            emailUpdates: false,
            language: "en"
        },
        stats: {
            modulesCompleted: 0,
            quizzesCompleted: 0,
            forumPosts: 56,
            achievements: 8
        },
        bio: "Performance optimization specialist with deep knowledge of database tuning and system architecture.",
        lastActive: "2024-07-03T15:10:00Z",
        status: "active",
        title: "Performance Engineer",
        rating: 4.7,
        courses: 6
    },
    {
        id: 8,
        name: "David Chen",
        email: "david.chen@devstudio.com",
        avatar: "https://placehold.co/100x100/FEE2E2/DC2626?text=DC",
        role: "student",
        level: "Intermediate",
        totalPoints: 445,
        studyStreak: 8,
        totalStudyHours: 35.2,
        joinedAt: "2024-02-20T00:00:00Z",
        reputation: 445,
        badge: "Helper",
        preferences: {
            theme: "dark",
            notifications: true,
            emailUpdates: false,
            language: "en"
        },
        stats: {
            modulesCompleted: 6,
            quizzesCompleted: 14,
            forumPosts: 22,
            achievements: 4
        },
        bio: "Full-stack developer passionate about clean code and best practices. Always learning new technologies.",
        lastActive: "2024-07-04T14:20:00Z",
        status: "active"
    },
    {
        id: 9,
        name: "Ben Carter",
        email: "ben.carter@uxstudio.com",
        avatar: "https://placehold.co/100x100/FEF3C7/F59E0B?text=BC",
        role: "instructor",
        level: "Expert",
        totalPoints: 756,
        studyStreak: 0,
        totalStudyHours: 0,
        joinedAt: "2023-10-05T00:00:00Z",
        reputation: 756,
        badge: "Senior Dev",
        preferences: {
            theme: "light",
            notifications: true,
            emailUpdates: true,
            language: "en"
        },
        stats: {
            modulesCompleted: 0,
            quizzesCompleted: 0,
            forumPosts: 78,
            achievements: 11
        },
        bio: "Senior developer with expertise in frontend technologies and user experience design.",
        lastActive: "2024-07-04T16:00:00Z",
        status: "active",
        title: "Senior Frontend Developer",
        rating: 4.8,
        courses: 9
    },
    {
        id: 10,
        name: "Lisa Anderson",
        email: "lisa.anderson@techlead.com",
        avatar: "https://placehold.co/100x100/ECFDF5/047857?text=LA",
        role: "instructor",
        level: "Expert",
        totalPoints: 892,
        studyStreak: 0,
        totalStudyHours: 0,
        joinedAt: "2023-07-20T00:00:00Z",
        reputation: 892,
        badge: "Tech Lead",
        preferences: {
            theme: "dark",
            notifications: true,
            emailUpdates: true,
            language: "en"
        },
        stats: {
            modulesCompleted: 0,
            quizzesCompleted: 0,
            forumPosts: 95,
            achievements: 13
        },
        bio: "Technical lead with 10+ years of experience in software architecture and team leadership.",
        lastActive: "2024-07-04T18:15:00Z",
        status: "active",
        title: "Technical Lead",
        rating: 4.9,
        courses: 15
    },
    {
        id: 11,
        name: "Tom Rodriguez",
        email: "tom.rodriguez@student.edu",
        avatar: "https://placehold.co/100x100/FEE2E2/DC2626?text=TR",
        role: "student",
        level: "Beginner",
        totalPoints: 334,
        studyStreak: 6,
        totalStudyHours: 18.7,
        joinedAt: "2024-04-10T00:00:00Z",
        reputation: 334,
        badge: "Helper",
        preferences: {
            theme: "light",
            notifications: true,
            emailUpdates: false,
            language: "en"
        },
        stats: {
            modulesCompleted: 3,
            quizzesCompleted: 8,
            forumPosts: 12,
            achievements: 2
        },
        bio: "Computer science student learning web development. Interested in both frontend and backend technologies.",
        lastActive: "2024-07-04T11:30:00Z",
        status: "active"
    },
    {
        id: 12,
        name: "Elena Petrova",
        email: "elena.petrova@dbadmin.com",
        avatar: "https://placehold.co/100x100/DBEAFE/1E40AF?text=EP",
        role: "instructor",
        level: "Expert",
        totalPoints: 567,
        studyStreak: 0,
        totalStudyHours: 0,
        joinedAt: "2023-11-15T00:00:00Z",
        reputation: 567,
        badge: "Database Admin",
        preferences: {
            theme: "light",
            notifications: true,
            emailUpdates: true,
            language: "en"
        },
        stats: {
            modulesCompleted: 0,
            quizzesCompleted: 0,
            forumPosts: 43,
            achievements: 6
        },
        bio: "Database administrator specializing in PostgreSQL and performance optimization.",
        lastActive: "2024-07-03T13:45:00Z",
        status: "active",
        title: "Database Administrator",
        rating: 4.8,
        courses: 7
    }
];