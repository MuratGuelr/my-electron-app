import { Link } from "react-router-dom";

const HomePageTitle = () => {
  return (
    <div className="text-center">
      <h1 className="m-10 mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
        Free Apps
      </h1>
      <p className="mb-6 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
        Here at Adobe Station we focus on giving free extensions to you guys. To
        go click the{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-sky-300 font-bold">
          "Free Apps"
        </span>
        button.
      </p>
      <Link
        to="/free-extensions"
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-900"
      >
        Free Apps
        <svg
          className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
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
  );
};

export default HomePageTitle;
