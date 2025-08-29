import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/usersSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:7777/auth/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));

      if (res.data.user.role === "admin") {
        showToast("success", "✅ Admin logged in successfully!");
        setTimeout(() => navigate("/admin-dashboard"), 1000);
      } else {
        showToast("success", "✅ Logged in successfully!");
        setTimeout(() => navigate("/projects"), 1000);
      }
    } catch (err) {
      showToast("error", err?.response?.data || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!userName || !email || !password) {
      showToast("error", "❌ All fields are required");
      return;
    }
    if (password.length < 6) {
      showToast("error", "❌ Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:7777/auth/signup",
        { userName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      showToast("success", "✅ Account created successfully!");
      setTimeout(() => navigate("/projects"), 1000);
    } catch (err) {
      showToast("error", err?.response?.data || "❌ Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {toast && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>
        {!isLoginForm && (
          <div>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full mb-3 px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            required
            minLength={6}
          />
        </div>
        <button
          onClick={isLoginForm ? handleLogin : handleSignUp}
          disabled={loading}
          className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:opacity-90 transition"
        >
          {loading ? "Please wait..." : isLoginForm ? "Login" : "Sign Up"}
        </button>
        <p
          className="text-center mt-4 text-green-400 cursor-pointer hover:underline"
          onClick={() => setIsLoginForm((prev) => !prev)}
        >
          {isLoginForm
            ? "New user? Sign up here"
            : "Already have an account? Login here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
