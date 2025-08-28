const TaskDetails = () => {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Task Title</h1>
      <p className="text-gray-700 mb-4">Task description goes here...</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Edit Task
      </button>
    </div>
  );
};

export default TaskDetails;
