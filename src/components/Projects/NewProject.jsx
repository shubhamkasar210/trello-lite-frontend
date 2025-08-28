import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:7777/projects",
        {
          title: projectName,
          description,
        },
        { withCredentials: true }
      );

      console.log("Project created:", res.data);

      setProjectName("");
      setDescription("");
      showToast("success", "✅ Project created successfully!");
      setTimeout(() => navigate("/projects"), 1000);
    } catch (error) {
      console.error("Error creating project:", error);
      showToast("error", "❌ Failed to create project");
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
          Create New Project
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Name
            </label>
            <input
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md hover:opacity-90 transition"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProject;
