import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProjects, deleteProject } from "../../utils/projectsSlice";
import { Pencil, Trash2, List, Columns } from "lucide-react";

const ProjectsDashboard = () => {
  const { data: projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:7777/projects", {
        withCredentials: true,
      });
      dispatch(setProjects(res.data));
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const confirmDelete = (id) => setConfirmModal(id);

  const handleDelete = async () => {
    if (!confirmModal) return;
    try {
      await axios.delete(`http://localhost:7777/projects/${confirmModal}`, {
        withCredentials: true,
      });
      dispatch(deleteProject(confirmModal));
      showToast("success", "✅ Project deleted successfully");
    } catch (err) {
      showToast(
        "error",
        err.response?.data?.message || "❌ Failed to delete project"
      );
    } finally {
      setConfirmModal(null);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 relative">
      {toast && (
        <div
          className={`fixed top-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      {confirmModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-xl p-6 w-full max-w-md text-center shadow-xl">
            <h2 className="text-lg font-semibold text-white mb-4">
              Are you sure you want to delete this project?
            </h2>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-center sm:text-left">
          My Projects
        </h1>
        <button
          onClick={() => navigate("/projects/new")}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md hover:opacity-90 transition"
        >
          + New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">
          No projects yet. Start building something
        </div>
      ) : (
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl hover:border-indigo-500/60 hover:scale-[1.02] transition-all"
            >
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition">
                  {project.title}
                </h2>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  Project
                </span>
              </div>

              <p className="text-gray-400 text-sm mt-3 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t border-gray-700/60 gap-2">
                <div
                  className="flex flex-wrap gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => navigate(`/projects/${project._id}/edit`)}
                    className="flex cursor-pointer items-center gap-1 px-2 py-1 text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm transition"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(project._id)}
                    className="flex cursor-pointer items-center gap-1 px-2 py-1 text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                  <button
                    onClick={() => navigate(`/projects/${project._id}/tasks`)}
                    className="flex cursor-pointer items-center gap-1 px-2 py-1 text-xs sm:text-sm bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm transition"
                  >
                    <List size={14} /> Tasks
                  </button>
                </div>

                <button
                  onClick={() => navigate(`/projects/${project._id}`)}
                  className="flex cursor-pointer items-center gap-1 px-2 py-1 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition"
                >
                  <Columns size={14} /> Kanban Board
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsDashboard;
