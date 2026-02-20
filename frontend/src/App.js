import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import QuizPage from "@/pages/QuizPage";
import ResultsPage from "@/pages/ResultsPage";
import SavedPage from "@/pages/SavedPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Remove Emergent badge if present (e.g. injected by external script)
  useEffect(() => {
    const removeBadge = () => {
      const badge = document.getElementById('emergent-badge');
      if (badge) {
        badge.remove();
      }
      document.querySelectorAll('a').forEach((el) => {
        if (el.textContent && el.textContent.includes('Made with Emergent')) {
          el.remove();
        }
      });
    };
    removeBadge();
    const interval = setInterval(removeBadge, 1000);
    return () => clearInterval(interval);
  }, []);

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

    return (
    <div className="App">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/signup" element={<SignupPage setToken={setToken} />} />
          <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
          <Route path="/saved" element={<ProtectedRoute><SavedPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;

