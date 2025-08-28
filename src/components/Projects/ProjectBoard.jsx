import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

const initialData = {
  todo: [
    { id: "task-1", title: "Design homepage" },
    { id: "task-2", title: "Fix login bug" },
  ],
  inProgress: [{ id: "task-3", title: "Build API" }],
  done: [{ id: "task-4", title: "Set up database" }],
};

const ProjectBoard = () => {
  const [tasks, setTasks] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = Array.from(tasks[source.droppableId]);
    const destColumn = Array.from(tasks[destination.droppableId]);

    const [movedTask] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  const headerColors = {
    todo: "#f58997",
    inProgress: "#f5e689",
    done: "#89f58e",
  };

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
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="bg-white p-3 rounded-xl mb-3 shadow text-black"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {task.title}
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
