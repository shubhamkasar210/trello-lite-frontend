import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { BASE_URL } from "../../utils/constants";

const TaskList = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/projects/${projectId}/tasks`, {
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const confirmDelete = (id) => {
    setConfirmModal(id);
  };

  const handleDelete = async () => {
    if (!confirmModal) return;
    try {
      await axios.delete(
        `${BASE_URL}/projects/${projectId}/tasks/${confirmModal}`,
        { withCredentials: true }
      );
      setTasks((prev) => prev.filter((t) => t._id !== confirmModal));
      showToast("success", "✅ Task deleted successfully");
    } catch (err) {
      showToast(
        "error",
        err.response?.data?.message || "❌ Failed to delete task"
      );
    } finally {
      setConfirmModal(null);
    }
  };

  if (loading) return <p className="p-6 text-white">Loading tasks...</p>;
  if (error) return <p className="p-6 text-red-400">{error}</p>;

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
              Are you sure you want to delete this task?
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
          Tasks
        </h1>
        <button
          onClick={() => navigate(`/projects/${projectId}/tasks/new`)}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:opacity-90 transition"
        >
          + New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">No tasks found.</div>
      ) : (
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="cursor-pointer group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl hover:border-green-500/60 hover:scale-[1.02] transition-all"
            >
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-white group-hover:text-green-400 transition">
                  {task.title}
                </h2>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                  {task.status || "Pending"}
                </span>
              </div>

              <p className="text-gray-400 text-sm mt-3 line-clamp-3">
                {task.description}
              </p>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700/60">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/projects/${projectId}/tasks/${task._id}/edit`)
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(task._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
                <span className="text-xs text-gray-500 italic">
                  Due:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
