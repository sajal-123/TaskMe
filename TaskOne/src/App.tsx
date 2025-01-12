import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from './utils/Layout';
import ProtectedRoute from './utils/ProtectedRoute';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Trashed from './pages/Trashed';
import TaskDetails from './pages/TaskDetails';
import Users from './pages/Users';
function App() {

  return (
    <>
      <Routes>
        {/* Layout for all routes */}
        <Route path="/" element={<Layout />}>
          {/* Redirect "/" to "/dashboard" */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/completed/:status"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inprogress/:status"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todo/:status"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trashed"
            element={
              <ProtectedRoute>
                <Trashed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/task/:id"
            element={
              <ProtectedRoute>
                <TaskDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />

          {/* Public Route */}
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
