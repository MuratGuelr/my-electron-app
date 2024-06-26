import { Link } from "react-router-dom";
import Image from "./Image";

const Card = ({ Apps }) => {
  return (
    <>
      {Apps.map((app) => (
        <div
          className="w-96 border shadow bg-gray-800 border-gray-700 transition-all duration-300 rounded-3xl cursor-pointer filter grayscale hover:grayscale-0"
          key={app.id}
        >
          <Link to={app.to}>
            <Image image={app.img} />
          </Link>
          <div className="p-5">
            <Link to={app.to}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                {app.name}
              </h5>
            </Link>
            <p className="mb-3 font-normal text-gray-400">{app.desc}</p>
            <Link
              to={app.to}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg focus:ring-4 focus:outline-none  bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Free Apps
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
