import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProjects, deleteProject } from "../../utils/projectsSlice";

const ProjectsDashboard = () => {
  const { data: projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await axios.delete(`http://localhost:7777/projects/${id}`, {
        withCredentials: true,
      });
      dispatch(deleteProject(id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete project");
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
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
          No projects yet. Start building something 🚀
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => navigate(`/projects/${project._id}`)}
              className="cursor-pointer bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl hover:border-indigo-500/50 hover:scale-[1.02] transition-all"
            >
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div
                className="flex flex-col sm:flex-row justify-end gap-2 mt-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => navigate(`/projects/${project._id}/edit`)}
                  className="w-full sm:w-auto px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="w-full sm:w-auto px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Delete
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
