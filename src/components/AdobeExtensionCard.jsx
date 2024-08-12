import { doc, collection, getDoc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { auth, db } from "../firebase/firebase";
import { onSnapshot } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import EditExtension from "./EditExtension";
import FavoriteApps from "./FavoriteApps";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import SearchBox from "./SearchBox";
import Loading from "./Loading";

const categories = [
  {
    name: "geliştirici",
    icon: "https://img.icons8.com/?size=100&id=7692&format=png&color=FFFFFF",
  },
  {
    name: "verimlilik",
    icon: "https://img.icons8.com/?size=100&id=quLzDd0ubRhQ&format=png&color=FFFFFF",
  },
  {
    name: "antivirüs",
    icon: "https://img.icons8.com/?size=100&id=79723&format=png&color=FFFFFF",
  },
  {
    name: "tarayıcı",
    icon: "https://img.icons8.com/?size=100&id=53372&format=png&color=FFFFFF",
  },
  {
    name: "iletişim",
    icon: "https://img.icons8.com/?size=100&id=9622&format=png&color=FFFFFF",
  },
  {
    name: "driver",
    icon: "https://img.icons8.com/?size=100&id=SDDUyPtXiQRf&format=png&color=FFFFFF",
  },
  {
    name: "video",
    icon: "https://img.icons8.com/?size=100&id=106753&format=png&color=FFFFFF",
  },
  {
    name: "oyun",
    icon: "https://img.icons8.com/?size=100&id=7317&format=png&color=FFFFFF",
  },
  {
    name: "ofis",
    icon: "https://img.icons8.com/?size=100&id=RgkjtPuuB8Eu&format=png&color=FFFFFF",
  },
  {
    name: "edit",
    icon: "https://img.icons8.com/?size=100&id=15109&format=png&color=FFFFFF",
  },
  {
    name: "ses",
    icon: "https://img.icons8.com/?size=100&id=41563&format=png&color=FFFFFF",
  },
];

const AdobeExtensionCard = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [extensionID, setExtensionID] = useState("");
  const [openClose, setOpenClose] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [extensions, setExtensions] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
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

  useEffect(() => {
    const colRef = collection(db, pathname);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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

  const filterArray = extensions.filter(
    (ext) =>
      ext.title.toLowerCase().includes(inputValue.toLowerCase().trim()) &&
      (selectedCategory ? ext.category === selectedCategory : true)
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {userDetails && (
        <>
          <div className="flex mb-5">
            <SearchBox inputValue={inputValue} setInputValue={setInputValue} />
          </div>

          {pathname === "/windows-x64bit" && (
            <>
              <div className="flex">
                <div className="flex m-auto gap-5">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      className={`p-2 rounded ${
                        selectedCategory === cat.name
                          ? "bg-gray-700"
                          : "bg-gray-800"
                      }`}
                      onClick={() => setSelectedCategory(cat.name)}
                    >
                      <img src={cat.icon} alt={cat.name} className="w-8 h-8" />
                    </button>
                  ))}
                  <button
                    className="p-2 rounded bg-gray-800"
                    onClick={() => setSelectedCategory("")}
                  >
                    <span className="text-white">All</span>
                  </button>
                </div>
              </div>
              <hr className="w-1/2 h-1 mx-auto bg-gradient-to-r to-sky-600 from-sky-800 border-0 rounded md:my-3 dark:bg-gray-700" />
            </>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-5">
            {filterArray.map((extension) => (
              <div
                key={extension.id}
                className="flex justify-between rounded transition-all text-center hover:scale-105 shadow-xl"
              >
                <EditExtension
                  extension={extension}
                  openClose={openClose}
                  setOpenClose={setOpenClose}
                  extensionID={extensionID}
                />
                <div
                  className={`relative p-5 rounded-lg shadow bg-gray-800 border-gray-700 transition-all ${
                    extension.isActive !== "active"
                      ? "filter grayscale cursor-not-allowed"
                      : ""
                  }`}
                >
                  {userDetails.email === "murat@extent.com" && (
                    <div className="flex justify-between text-xl font-semibold tracking-tight text-white mb-2">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenClose(true);
                          setExtensionID(extension.id);
                        }}
                      >
                        <FaEdit
                          size={21}
                          className="text-white hover:text-gray-300"
                        />
                      </button>

                      <button
                        type="button"
                        className="text-gray-400 bg-transparent rounded-lg text-sm hover:bg-gray-600 hover:text-white"
                        onClick={() => handleDelete(extension.id)}
                      >
                        <MdDeleteOutline size={26} className="text-white" />
                      </button>
                    </div>
                  )}
                  <FavoriteApps appId={extension.id} extension={extension} />

                  <div className="flex items-center justify-between">
                    {extension.isNew === "new" && (
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-900 text-green-300 absolute">
                        New
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-center">
                      <img
                        className="rounded w-auto"
                        src={extension.image}
                        alt="Extension"
                      />
                    </div>
                  </div>
                  <h5 className="font-bold text-white">{extension.title}</h5>

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

                  <div className="flex justify-between">
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
        </>
      )}
    </>
  );
};

export default AdobeExtensionCard;
