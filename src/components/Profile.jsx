import { useSelector } from "react-redux";

const Profile = () => {
  // Access the user from Redux state
  const { user } = useSelector((state) => state.users);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          My Profile
        </h1>

        <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 space-y-4">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Email</span>
            <span className="text-white text-lg font-medium">
              {user?.email || "john@example.com"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Role</span>
            <span className="text-white text-lg font-medium">
              {user?.role || "user"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
