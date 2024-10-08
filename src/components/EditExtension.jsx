import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useLocation } from "react-router";
import Loading from "./Loading";
import { toast } from "react-toastify";

const EditExtension = ({ openClose, setOpenClose, extensionID }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const [extensionData, setExtensionData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [download, setDownload] = useState("");
  const [howTo, setHowTo] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState("");
  const [isNew, setIsNew] = useState("");
  const [whichApp, setWhichApp] = useState(
    "../img/adobe-premiere/premiere-logo/premiere.png"
  );
  const [isActive, setIsActive] = useState("");
  const [isPremium, setIsPremium] = useState("");
  const [category, setCategory] = useState("");

  const extensionDatas = {
    category,
    title,
    image,
    download,
    howTo,
    price: parseInt(price),
    rating: parseFloat(rating),
    isNew,
    whichApp,
    isActive,
  };

  useEffect(() => {
    const fetchExtensionData = async () => {
      try {
        const extensionRef = doc(db, pathname, extensionID);
        const docSnap = await getDoc(extensionRef);

        if (docSnap.exists()) {
          const extensionData = docSnap.data();
          setExtensionData(extensionData);
          setTitle(extensionData.title);
          setImage(extensionData.image);
          setDownload(extensionData.download);
          setHowTo(extensionData.howTo);
          setPrice(extensionData.price);
          setRating(extensionData.rating);
          setIsNew(extensionData.isNew);
          setWhichApp(extensionData.whichApp);
          setIsActive(extensionData.isActive);
          setCategory(extensionData.category);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        toast.error(error);
        setLoading(false);
      }
    };

    fetchExtensionData();
  }, [extensionID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const extensionRef = doc(db, pathname, extensionID);
      await updateDoc(extensionRef, extensionDatas);
      setExtensionData(extensionDatas);
      toast.success("Extension updated successfully!");
      setOpenClose(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {loading && <Loading />}
      {extensionData && (
        <div
          id="popup-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={
            openClose
              ? "justify-center items-center overflow-x-hidden w-full md:inset-0 fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-5 flex"
              : "hidden justify-center items-center overflow-x-hidden w-full md:inset-0 fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-5"
          }
        >
          <div className="relative p-8 w-full max-w-md scale-90">
            <div className="relative rounded-lg shadow bg-gray-700">
              <div className="flex items-center justify-between md:p-5 border-b rounded-t border-gray-600">
                <div className="flex items-center bg-gray-900">
                  <form
                    className="max-w-sm mx-auto bg-gray-800 p-5 justify-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded"
                    onSubmit={handleSubmit}
                  >
                    <button
                      type="button"
                      className="absolute top-3 end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                      data-modal-hide="popup-modal"
                      onClick={() => setOpenClose(false)}
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

                    <h2 className="text-white mb-3">
                      Edit the "
                      <span className="text-blue-200">
                        {extensionData.title}
                      </span>
                      "
                    </h2>
                    <div className="flex gap-5">
                      <div className="mb-5">
                        <label
                          htmlFor="Title"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Title
                        </label>
                        <input
                          type="title"
                          id="type"
                          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Type the title..."
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>

                      <div className="mb-5">
                        <label
                          htmlFor="img"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Image
                        </label>
                        <input
                          type="type"
                          id="img"
                          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Type the image url..."
                          required
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="download"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Download Url
                      </label>
                      <input
                        type="type"
                        id="download"
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type the image url..."
                        required
                        value={download}
                        onChange={(e) => setDownload(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-5 justify-between">
                      <div className="mb-5">
                        <label
                          htmlFor="howTo"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Tutorial
                        </label>
                        <input
                          type="title"
                          id="howTo"
                          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Type the Tutorial..."
                          required
                          value={howTo}
                          onChange={(e) => setHowTo(e.target.value)}
                        />
                      </div>

                      <div className="mb-5">
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          id="price"
                          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Type the price..."
                          value={price}
                          max={9999}
                          min={0}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="rating"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        Rating
                      </label>
                      <input
                        type="number"
                        id="rating"
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type the rating..."
                        required
                        value={rating}
                        min={1}
                        max={5}
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="isNew"
                        className="block mb-2 text-sm font-medium text-white"
                      >
                        New or Old?
                      </label>
                      <select
                        id="isNew"
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        value={isNew}
                        required
                        onChange={(e) => setIsNew(e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="old">Old</option>
                      </select>
                    </div>

                    <div className="flex justify-evenly">
                      <div className="mb-5">
                        <label
                          htmlFor="isActive"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Does it still active?
                        </label>
                        <select
                          id="isActive"
                          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                          value={isActive}
                          required
                          onChange={(e) => setIsActive(e.target.value)}
                        >
                          <option value="active">Active</option>
                          <option value="passive">Passive</option>
                        </select>
                      </div>

                      <div className="mb-5">
                        <label
                          htmlFor="isPremium"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Free or Premium?
                        </label>

                        {price === 0 ? (
                          <select
                            id="isPremium"
                            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            value={false}
                            disabled
                          >
                            <option value={false}>Free</option>
                          </select>
                        ) : (
                          <select
                            id="isPremium"
                            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            value={true}
                            disabled
                          >
                            <option value={true}>Premium</option>
                          </select>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="px-2 text-sm font-medium text-center border rounded-s-lg focus:ring-4 focus:outline-none bg-gray-700 hover:bg-gray-600 focus:ring-gray-700 text-white border-gray-600">
                        <label
                          htmlFor="whichApp"
                          className="block mb-1 mt-1 text-sm font-medium text-white"
                        >
                          Which Category?
                        </label>
                        <div className="grid grid-cols-4 gap-5">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d9/HandBrake_Icon.png"
                            className="w-20"
                          />
                          <img
                            src="https://upload.wikimedia.org/wikipedia/tr/5/57/Discord_logo_old.png"
                            className="w-20"
                          />
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Steam_Logo.png"
                            className="w-20"
                          />
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Audacity_Logo.svg/2048px-Audacity_Logo.svg.png"
                            className="w-20"
                          />
                        </div>
                      </div>
                      <select
                        id="category"
                        className="border text-l rounded-lg block w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mb-5 text-center"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value=""></option>
                        <option value="geliştirici">Geliştirici</option>
                        <option value="verimlilik">Verimlilik</option>
                        <option value="antivirüs">Antivirüs</option>
                        <option value="tarayıcı">Tarayıcı</option>
                        <option value="iletişim">İletişim</option>
                        <option value="driver">Driver</option>
                        <option value="video">Video</option>
                        <option value="oyun">Oyun</option>
                        <option value="ofis">Ofis</option>
                        <option value="edit">Edit</option>
                        <option value="ses">Ses</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    >
                      Update Extension
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditExtension;
