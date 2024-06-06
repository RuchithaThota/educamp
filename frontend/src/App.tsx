import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeLayout from './layout/HomeLayout';
import OAuthRedirect from './components/auth/OAuthRedirect';
import React, { Suspense } from 'react';
import FallbackSpinner from './components/common/FallbackSpinner';

const Homepage = React.lazy(() => import('./pages/Homepage'));
const ProtectedRoute = React.lazy(() => import('./routes/ProtectedRoute'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Performance = React.lazy(() => import('./pages/Performance'));
const Quiz = React.lazy(() => import('./components/quiz/Quiz'));

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<FallbackSpinner />}>
              <HomeLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<FallbackSpinner />}>
                <Homepage />
              </Suspense>
            }
          />
          <Route path="auth/success" element={<OAuthRedirect />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<FallbackSpinner />}>
              <ProtectedRoute />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<FallbackSpinner />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="take-quiz"
            element={
              <Suspense fallback={<FallbackSpinner />}>
                <Quiz />
              </Suspense>
            }
          />
          <Route
            path="view-performance"
            element={
              <Suspense fallback={<FallbackSpinner />}>
                <Performance />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
