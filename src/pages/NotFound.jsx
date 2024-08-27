import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
const NotFound = () => {
  return (
    <>
      <div className="bg-gray-900 min-h-screen">
        <section className="text-center flex flex-col justify-center items-center h-96 text-white ">
          <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
          <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
          <p className="text-xl mb-5">This page does not exist</p>
          <Link
            to="/"
            className="text-white bg-blue-500 hover:bg-blue-400 rounded-md px-3 py-2 mt-4"
          >
            Go Back
          </Link>
        </section>
      </div>
    </>
  );
};

export default NotFound;
