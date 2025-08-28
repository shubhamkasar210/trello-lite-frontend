import React from "react";

const EditTask = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
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
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Save Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
