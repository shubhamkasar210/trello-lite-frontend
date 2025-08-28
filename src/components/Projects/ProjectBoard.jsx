import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectBoard = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks for this project
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7777/projects/${projectId}/tasks`,
          { withCredentials: true }
        );

        // Transform tasks into columns based on status
        const data = { todo: [], inProgress: [], done: [] };
        res.data.forEach((task) => {
          if (task.status === "To Do") data.todo.push(task);
          else if (task.status === "In Progress") data.inProgress.push(task);
          else if (task.status === "Done") data.done.push(task);
        });

        setTasks(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  // Handle drag & drop
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceColumn = Array.from(tasks[source.droppableId]);
    const destColumn = Array.from(tasks[destination.droppableId]);

    const [movedTask] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedTask);

    // Update UI immediately
    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });

    // TODO: Call API to update task status
    // axios.put(`http://localhost:7777/tasks/${movedTask._id}`, {
    //   status: destination.droppableId === "todo"
    //     ? "To Do"
    //     : destination.droppableId === "inProgress"
    //     ? "In Progress"
    //     : "Done",
    // });
  };

  const headerColors = {
    todo: "#f58997",
    inProgress: "#f5e689",
    done: "#89f58e",
  };

  if (loading) return <p className="p-6 text-white">Loading board...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(tasks).map(([columnId, columnTasks]) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <div
                className="bg-gray-100 rounded-2xl shadow-md flex flex-col"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2
                  className="text-3xl font-bold text-center p-3 rounded-t-2xl"
                  style={{
                    backgroundColor: headerColors[columnId],
                    color: "#172b4d",
                  }}
                >
                  {columnId.replace(/([A-Z])/g, " $1")}
                </h2>

                <div className="p-3 flex-1 min-h-[300px]">
                  {columnTasks.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="bg-white p-3 rounded-xl mb-3 shadow text-black"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <h3 className="font-semibold">{task.title}</h3>
                          <p className="text-sm text-gray-600">
                            {task.description}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default ProjectBoard;
