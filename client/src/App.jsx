import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { DocumentProvider } from './context/DocumentContext';
import { ChatProvider } from './context/ChatContext';

import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';
import AIAssistantPage from './pages/AIAssistantPage';
import MaintenancePage from './pages/MaintenancePage';
import CompliancePage from './pages/CompliancePage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <DocumentProvider>
            <ChatProvider>
              <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* Dashboard Authenticated Routes */}
                <Route path="/app" element={<DashboardLayout />}>
                  <Route index element={<Navigate to="/app/dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="documents" element={<DocumentsPage />} />
                  <Route path="assistant" element={<AIAssistantPage />} />
                  <Route path="maintenance" element={<MaintenancePage />} />
                  <Route path="compliance" element={<CompliancePage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>

                {/* Fallback Catch-all Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ChatProvider>
          </DocumentProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
