const NewTask = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Task Title"
          className="w-full border p-2 rounded-md"
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded-md"
        ></textarea>
        <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default NewTask;
