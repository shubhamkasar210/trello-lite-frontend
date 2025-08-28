const ManageMembers = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Members</h1>
      <div className="space-y-2">
        <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow">
          <span>Jane Smith</span>
          <button className="bg-red-600 text-white px-2 py-1 rounded-md">
            Remove
          </button>
        </div>
        <form className="flex gap-2 mt-4">
          <input
            type="email"
            placeholder="Invite by Email"
            className="flex-1 border p-2 rounded-md"
          />
          <button className="bg-green-600 text-white px-4 rounded-md">
            Invite
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageMembers;
