const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded-md"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
