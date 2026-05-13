import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home      from './pages/Home';
import Register  from './pages/Register';
import Login     from './pages/Login';
import Templates from './pages/Templates';
import Favorites from './pages/Favorites';

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-surface flex flex-col">
        <Navbar />

        <div className="flex-1">
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/register"  element={<Register />} />
            <Route path="/login"     element={<Login />} />
            <Route path="/templates" element={<Templates />} />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <footer className="border-t border-surface-border py-6 mt-10">
          <div className="page-container flex flex-col sm:flex-row
                          items-center justify-between gap-2">
            <p className="text-slate-600 text-xs">
              © {new Date().getFullYear()} TemplateHub.
              Built for the Full Stack Intern Technical Task.
            </p>
            <p className="text-slate-700 text-xs font-mono">
              React + Node.js + MongoDB
            </p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
};

export default App;
