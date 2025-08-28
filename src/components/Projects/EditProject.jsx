import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProject } from "../../utils/projectsSlice";

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const project = useSelector((state) =>
    state.projects.data.find((p) => p._id === projectId)
  );

  const [projectName, setProjectName] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [loading, setLoading] = useState(!project);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!project) {
      const fetchProject = async () => {
        try {
          const res = await axios.get(
            `http://localhost:7777/projects/${projectId}`,
            { withCredentials: true }
          );
          setProjectName(res.data.title);
          setDescription(res.data.description);
        } catch {
          showToast("error", "❌ Failed to fetch project details");
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    } else {
      setLoading(false);
    }
  }, [projectId, project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:7777/projects/${projectId}`,
        { title: projectName, description },
        { withCredentials: true }
      );

      dispatch(updateProject(res.data));
      showToast("success", "✅ Project updated successfully!");
      setTimeout(() => navigate("/projects"), 1000);
    } catch (err) {
      showToast(
        "error",
        err.response?.data?.message || "❌ Failed to update project"
      );
    }
  };

  if (loading) return <p className="p-6 text-white">Loading project...</p>;

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
          Edit Project
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Name
            </label>
            <input
              type="text"
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
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
