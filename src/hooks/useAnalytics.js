import { useState, useEffect, useCallback } from 'react';

export const useAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  // Mock analytics data
  const mockAnalyticsData = {
    summary: {
      totalModules: 45,
      completedModules: 28,
      totalStudyTime: 142, // hours
      currentStreak: 7,
      achievementPoints: 1250,
      weeklyGoal: 14, // hours
      weeklyProgress: 9.5 // hours
    },
    
    // Line chart data - Weekly learning progress
    weeklyProgress: [
      { week: 'Week 1', hours: 12, modules: 3, quizzes: 2 },
      { week: 'Week 2', hours: 15, modules: 4, quizzes: 3 },
      { week: 'Week 3', hours: 8, modules: 2, quizzes: 1 },
      { week: 'Week 4', hours: 18, modules: 5, quizzes: 4 },
      { week: 'Week 5', hours: 14, modules: 3, quizzes: 2 },
      { week: 'Week 6', hours: 10, modules: 2, quizzes: 1 },
      { week: 'This Week', hours: 9.5, modules: 2, quizzes: 1 }
    ],
    
    // Bar chart data - Study time per category
    studyTimeByCategory: [
      { category: 'Programming', hours: 45, color: '#3b82f6' },
      { category: 'Database', hours: 32, color: '#10b981' },
      { category: 'Network', hours: 28, color: '#f59e0b' },
      { category: 'Security', hours: 20, color: '#ef4444' },
      { category: 'Design', hours: 17, color: '#8b5cf6' }
    ],

    // Pie chart data - Quiz performance
    quizPerformance: [
      { label: 'Correct', value: 85, color: '#10b981' },
      { label: 'Incorrect', value: 15, color: '#ef4444' }
    ],

    // Radar chart data - Skill proficiency
    skillProficiency: [
      { skill: 'React', value: 80 },
      { skill: 'Node.js', value: 70 },
      { skill: 'SQL', value: 65 },
      { skill: 'Networking', value: 60 },
      { skill: 'Security', value: 55 },
      { skill: 'UI/UX', value: 50 }
    ]
  };

  // Simulate fetching analytics data
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate async fetch
    const timer = setTimeout(() => {
      try {
        setDashboardData(mockAnalyticsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load analytics data');
        setLoading(false);
      }
    }, 800); // 0.8s delay

    return () => clearTimeout(timer);
  }, []);

  // Optionally, provide a manual refresh
  const refreshAnalytics = useCallback(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setDashboardData(mockAnalyticsData);
      setLoading(false);
    }, 800);
  }, []);

  return {
    loading,
    error,
    dashboardData,
    refreshAnalytics
  };
};
