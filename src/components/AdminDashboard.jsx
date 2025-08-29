import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const AdminDashboard = () => {
  const [projectId, setProjectId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/projects/${projectId}/members`,
        { memberId },
        { withCredentials: true }
      );
      showToast("success", "✅ Member added successfully!");
      setProjectId("");
      setMemberId("");
    } catch (err) {
      showToast(
        "error",
        err.response?.data?.error || "❌ Failed to add member"
      );
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

      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
          Add Project Member
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project ID
            </label>
            <input
              type="text"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              placeholder="Enter project ID"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Member ID
            </label>
            <input
              type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="Enter user ID"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:opacity-90 transition"
          >
            Add Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
