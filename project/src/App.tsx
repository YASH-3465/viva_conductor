import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginForm } from './components/LoginForm';
import { MentorDashboard } from './components/MentorDashboard';
import { StudentDashboard } from './components/StudentDashboard';

function AppContent() {
  const { currentUser, userType } = useApp();

  if (!currentUser || !userType) {
    return <LoginForm />;
  }

  if (userType === 'mentor') {
    return <MentorDashboard />;
  }

  return <StudentDashboard />;
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;