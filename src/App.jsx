import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";

import ProjectsDashboard from "./components/Projects/ProjectsDashboard";
import NewProject from "./components/Projects/NewProject";
import ProjectBoard from "./components/Projects/ProjectBoard";
import EditProject from "./components/Projects/EditProject";

import ManageMembers from "./components/ManageMembers";

import TaskList from "./components/Tasks/TaskList";
import TaskDetails from "./components/Tasks/TaskDetails";
import NewTask from "./components/Tasks/NewTask";
import EditTask from "./components/Tasks/EditTask";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <Provider store={appStore}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black ">
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Login />}></Route>
              <Route element={<ProtectedRoutes />}>
                <Route path="/projects" element={<ProjectsDashboard />} />

                <Route path="/projects/new" element={<NewProject />} />
                <Route path="/projects/:projectId" element={<ProjectBoard />} />
                <Route
                  path="/projects/:projectId/edit"
                  element={<EditProject />}
                />

                <Route
                  path="projects/:projectId/tasks"
                  element={<TaskList />}
                />
                <Route
                  path="/projects/:projectId/tasks/new"
                  element={<NewTask />}
                />
                <Route
                  path="/projects/:projectId/tasks/:taskId"
                  element={<TaskDetails />}
                />
                <Route
                  path="/projects/:projectId/tasks/:taskId/edit"
                  element={<EditTask />}
                />

                <Route
                  path="/projects/:projectId/members"
                  element={<ManageMembers />}
                />

                <Route path="/profile" element={<Profile />}></Route>
                <Route
                  path="/admin-dashboard"
                  element={<AdminDashboard />}
                ></Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
