import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { toast } from "react-toastify";
import { doc, collection, getDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import Loading from "./Loading";
import EditExtension from "./EditExtension";
import { onSnapshot } from "firebase/firestore";

const AdobeExtensionCard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [extensionID, setExtensionID] = useState("");
  const [openClose, setOpenClose] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [extensions, setExtensions] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const pathname = location.pathname;

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        setLoggedIn("User is not logged in!");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const colRef = collection(db, pathname);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setExtensions(docs);
        setLoading(false);
      },
      (error) => {
        toast.error(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [pathname]);

  const handleDelete = async (extensionId) => {
    try {
      await deleteDoc(doc(db, pathname, extensionId));
      toast.success("Extension deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  function getRatingStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ml-8 text-yellow-300 ${
            i < rating ? "" : "text-gray-200 dark:text-gray-600"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
    return stars;
  }

  function handleRating(extension) {
    return (
      <div className="flex items-center mt-2.5 mb-5">
        <div className="flex items-center space-x-1 rtl:space-x-reverse ">
          {getRatingStars(extension.rating)}
        </div>
      </div>
    );
  }

  const filterArray = extensions.filter((a) =>
    a.title.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase().trim())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {userDetails && (
        <>
          <div className="flex">
            <div className="flex flex-1">
              <SearchBox
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </div>
          </div>

          <div className="relative">
            <div className="w-auto h-svh">
              <div className="grid grid-cols-4 m-10 p-5 gap-5">
                {filterArray.map((extension) => (
                  <div
                    className={
                      extension.price
                        ? "border-4 border-pink rounded-2xl transition-all"
                        : ""
                    }
                    key={extension.id}
                  >
                    <EditExtension
                      extension={extension}
                      openClose={openClose}
                      setOpenClose={setOpenClose}
                      extensionID={extensionID}
                    />
                    <div
                      className={
                        extension.isActive === "active"
                          ? "bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-all"
                          : "bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 filter grayscale transition-all cursor-not-allowed"
                      }
                    >
                      {userDetails.email === "murat@extent.com" && (
                        <div className="bg-gray-950">
                          <div className="flex justify-between text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            <button
                              type="button"
                              onClick={() => {
                                setOpenClose(true);
                                setExtensionID(extension.id);
                              }}
                            >
                              <svg
                                className="w-6 h-6 ml-4 mt-2 text-gray-800 dark:text-white cursor-pointer"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                                />
                              </svg>
                            </button>
                            {extension.price ? (
                              <div>
                                <img
                                  src="../img/premium.svg"
                                  className="w-12 absolute -mt-7 inline-block ml-24"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            <button
                              type="button"
                              className="top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white mr-2 mt-2"
                              data-modal-hide="popup-modal"
                              onClick={() => handleDelete(extension.id)}
                            >
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                              </svg>
                              <span className="sr-only">Close modal</span>
                            </button>
                          </div>
                        </div>
                      )}
                      <div className="absolute align-middle mt-2">
                        <div className="items-center justify-between">
                          {extension.isNew === "new" ? (
                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 ml-2">
                              New{" "}
                            </span>
                          ) : (
                            ""
                          )}
                          {extension.price === 0 ? (
                            <span className="text-base font-bold text-gray-900 dark:text-white"></span>
                          ) : (
                            <span className="text-base font-bold text-gray-900 dark:text-white">
                              {extension.price + "₺"}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <img
                          className="rounded-t-lg p-2"
                          src={extension.image}
                          alt="product image"
                        />
                        <div className="px-5 pb-5">
                          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {extension.title}
                          </h5>
                          <img
                            src={extension.whichApp}
                            className="h-7 absolute mt-1"
                          />
                          {handleRating(extension)}

                          <div className="flex items-center justify-between">
                            {extension.isActive === "active" ? (
                              <Link
                                to={extension.howTo}
                                className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                                target="_blank"
                              >
                                How To Use?
                              </Link>
                            ) : (
                              <button className="text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 cursor-not-allowed">
                                How To Use?
                              </button>
                            )}

                            {extension.price ? (
                              <button
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-not-allowed"
                                disabled
                              >
                                Download
                              </button>
                            ) : (
                              <>
                                {extension.isActive === "active" ? (
                                  <Link
                                    to={extension.download}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    target="_blank"
                                  >
                                    Download
                                  </Link>
                                ) : (
                                  <button
                                    to="/"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-not-allowed"
                                    disabled
                                  >
                                    Download
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdobeExtensionCard;
