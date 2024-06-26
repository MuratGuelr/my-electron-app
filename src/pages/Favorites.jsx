import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [favoriteApps, setFavoriteApps] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserDetails(userData);
            setFavoriteApps(userData.favorites || []);
          } else {
            toast.error("User data not found");
          }
        } else {
          toast.error("User is not logged in");
        }
      });
    };
    fetchUserData();
  }, []);

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

  return (
    <div>
      {favoriteApps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {favoriteApps.map((extension) => (
            <div
              key={extension.id}
              className="rounded transition-all text-center"
            >
              <div
                className={`relative p-5 rounded-lg shadow bg-gray-800 border-gray-700 transition-all ${
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
                      className="rounded w-36"
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
                      className="text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:ring"
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
        <p>No favorite apps found</p>
      )}
    </div>
  );
};

export default Favorites;
