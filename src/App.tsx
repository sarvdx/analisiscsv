import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthForm } from './components/auth/AuthForm';
import { Header } from './components/layout/Header';
import { Upload } from './pages/Upload';
import { Toaster } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './lib/firebase';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        {user ? (
          <>
            <Header />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<div>Dashboard</div>} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/dashboards" element={<div>Dashboards</div>} />
              </Routes>
            </main>
          </>
        ) : (
          <AuthForm />
        )}
      </div>
    </Router>
  );
}

export default App;