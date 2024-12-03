import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { BarChart2, Upload, Layout, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export function Header() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center text-indigo-600 font-bold text-xl"
            >
              <BarChart2 className="h-8 w-8 mr-2" />
              CSV Analyzer
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/upload"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Link>
              <Link
                to="/dashboards"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                <Layout className="h-4 w-4 mr-2" />
                Dashboards
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}