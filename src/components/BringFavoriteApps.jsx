import React, { useState } from "react";
import { Link } from "react-router-dom";

const BringFavoriteApps = ({ favoriteApps, AppType }) => {
  const [BringedApp, setBringedApp] = useState("");

  const getRatingStars = (rating) => {
    return Array(5)
      .fill()
      .map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-yellow-300" : "text-gray-600"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ));
  };

  const filteredApps = favoriteApps.filter(
    (extension) => extension.whichApp === AppType
  );

  return (
    <>
      {filteredApps.length > 0 ? (
        <div className="mt-10 mb-5">
          <div className="flex justify-center gap-2">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-sky-300 text-2xl font-bold md:text-3xl lg:text-4xl">
              Favorite
            </h1>
            <img src={AppType} className="w-12 h-12 -mt-2" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-white text-2xl font-bold md:text-3xl lg:text-4xl">
              Apps
            </h1>
          </div>
          <hr className="w-56 h-1 mx-auto bg-gradient-to-r to-sky-600 from-white border-0 rounded md:my-3 dark:bg-gray-700" />
        </div>
      ) : (
        ""
      )}

      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredApps.map((extension) => (
            <div
              key={extension.id}
              className="rounded-lg transition-all text-center bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div
                className={`relative p-5 rounded-lg border border-gray-700 transition-all ${
                  extension.isActive !== "active"
                    ? "filter grayscale cursor-not-allowed"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  {extension.isNew === "new" && (
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-900 text-green-300 absolute mt-5">
                      New
                    </span>
                  )}
                </div>
                <div className="-mt-7">
                  <div className="flex justify-center">
                    <img
                      className="rounded-lg w-36"
                      src={extension.image}
                      alt="Extension"
                    />
                  </div>
                </div>
                <h5 className="text-2xl font-semibold tracking-tight text-white mb-1">
                  {extension.title}
                </h5>

                <div className="flex justify-center scale-75">
                  <img
                    src={extension.whichApp}
                    className="h-6"
                    alt="App logo"
                  />
                  <div className="flex ml-1 mt-1 mb-5">
                    {getRatingStars(extension.rating)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {extension.isActive === "active" ? (
                    <Link
                      to={extension.howTo}
                      className="text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:ring hover:bg-gray-700"
                      target="_blank"
                    >
                      Website
                    </Link>
                  ) : (
                    <button className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-600 cursor-not-allowed">
                      Website
                    </button>
                  )}
                  {extension.price ? (
                    <button
                      className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 cursor-not-allowed"
                      disabled
                    >
                      Download
                    </button>
                  ) : extension.isActive === "active" ? (
                    <Link
                      to={extension.download}
                      className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700"
                    >
                      Download
                    </Link>
                  ) : (
                    <button
                      className="text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-600 cursor-not-allowed"
                      disabled
                    >
                      Download
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default BringFavoriteApps;
