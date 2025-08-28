const Profile = () => {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white p-4 rounded-xl shadow space-y-2">
        <p>
          <strong>Name:</strong> John Doe
        </p>
        <p>
          <strong>Email:</strong> john@example.com
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Update Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
