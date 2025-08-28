const EditProject = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          className="w-full border p-2 rounded-md"
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded-md"
        ></textarea>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProject;
