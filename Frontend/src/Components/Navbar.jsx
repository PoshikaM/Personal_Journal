import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-gray-800 px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">My Journal</h1>
      <div className="space-x-4">
        <Link
          to="/"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Home
        </Link>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          New Entry
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;