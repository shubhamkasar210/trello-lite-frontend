import { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:7777/tasks", {
          withCredentials: true, // if using cookies/JWT
        });
        setTasks(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <p className="p-6 text-white">Loading tasks...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-400">{error}</p>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-[#006b80] p-4 rounded-lg shadow-md"
            >
              <h2 className="font-semibold text-lg">{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-sm text-gray-300">
                Status: {task.status || "Not Set"}
              </p>
              <p className="text-sm text-gray-300">
                Due:{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
