import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const NewTask = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [dueDate, setDueDate] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        BASE_URL + "/tasks",
        { projectId, title, description, status, dueDate },
        { withCredentials: true }
      );
      showToast("success", "✅ Task created successfully!");
      setTimeout(() => navigate(`/projects/${projectId}/tasks`), 1000);
    } catch (err) {
      showToast("error", err.response?.data || "❌ Failed to create task");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {toast && (
        <div
          className={`fixed top-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition transform ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-full max-w-lg bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
          Create New Task
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:opacity-90 transition"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
