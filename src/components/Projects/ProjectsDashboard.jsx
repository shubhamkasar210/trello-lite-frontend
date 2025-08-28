import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProjectsDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:7777/projects", {
          withCredentials: true,
        });

        setProjects(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p className="p-6 text-white">Loading projects...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-white">My Projects</h1>
      {projects.length === 0 ? (
        <p className="text-white">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project._id}
              to={`/projects/${project._id}`}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p className="text-gray-600">{project.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsDashboard;
