import { NavLink } from "react-router-dom";

const Navbar = () => {
  const isLinkActive = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 ml-3"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 ml-3";

  return (
    <nav className="bg-orange-600 border-b border-orange-600">
      <div className="mx-auto max-w-7x1 px-2 sm:px-6 lg:px8">
        <div className="flex h-20 items-center justify-between">
          <NavLink className="flex flex-shrink-0 items-center" to="/">
            <img src="/app.png" className="h-10 w-auto" />
            <span className="hidden md:block text-white text-2xl font-bold ml-3 ">
              Download Apps{" "}
            </span>
          </NavLink>
          <div className="md:ml-auto">
            <div className="flex items-center">
              <NavLink to="/" className={isLinkActive}>
                Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
