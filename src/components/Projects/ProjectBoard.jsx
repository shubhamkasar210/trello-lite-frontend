const ProjectBoard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Project Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-xl">To Do</div>
        <div className="bg-gray-100 p-4 rounded-xl">In Progress</div>
        <div className="bg-gray-100 p-4 rounded-xl">Done</div>
      </div>
    </div>
  );
};

export default ProjectBoard;
