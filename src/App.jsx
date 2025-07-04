import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Layout from "./components/common/Layout";
import DemoContent from "./pages/admin/DemoContent";
import ErrorBoundary from "./components/common/ErrorBoundary";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { UserPreferencesProvider } from "./contexts/UserPreferencesContext";
import { AchievementProvider } from "./contexts/AchievementContext";

import Dashboard from "./pages/admin/Dashboard";
import Forum from "./pages/admin/Forum";
import Instruktur from "./pages/admin/Instruktur";
import Pencapaian from "./pages/admin/Pencapaian";
import Quiz from "./pages/admin/Quiz";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 6 * 1000,
      cacheTime: 10 * 60 * 1000
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <UserPreferencesProvider>
            <AchievementProvider>
              <Router>
                <ErrorBoundary>
                  <Layout>
                    <Routes>
                      {/* Main routes */}
                      <Route path="/admin/dashboard" element={<Dashboard />} />
                      <Route path="/admin/quiz" element={<Quiz />} />
                      <Route path="/admin/forum" element={<Forum />} />
                      <Route path="/admin/pencapaian" element={<Pencapaian />} />
                      <Route path="/admin/instruktur" element={<Instruktur />} />

                      {/* Default redirect */}
                      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

                      {/* Catch all route */}
                      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                    </Routes>
                  </Layout>
                </ErrorBoundary>
              </Router>
            </AchievementProvider>
          </UserPreferencesProvider>
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
