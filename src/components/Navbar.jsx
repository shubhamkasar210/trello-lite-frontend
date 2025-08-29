import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/usersSlice";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:7777/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const isLoggedIn = !!user;

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-400">
              Trello - lite
            </Link>
          </div>

          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    className="w-10 h-10 rounded-full border-2 border-indigo-400"
                    src={"https://geographyandyou.com/images/user-profile.png"}
                    alt="Profile"
                  />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/projects"
                      className="block px-4 py-2 text-sm hover:bg-gray-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      All Projects
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {isLoggedIn && (
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      menuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {isLoggedIn && menuOpen && (
        <div className="md:hidden bg-gray-800 px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/profile"
            className="block px-3 py-2 rounded text-base hover:bg-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/projects"
            className="block px-3 py-2 rounded text-base hover:bg-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            All Projects
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded text-base hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
