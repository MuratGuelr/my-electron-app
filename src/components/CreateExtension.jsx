import React, { useState } from "react";
import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const CreateExtension = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [download, setDownload] = useState("");
  const [howTo, setHowTo] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState("");
  const [isNew, setIsNew] = useState("new");
  const [whichApp, setWhichApp] = useState(
    "../img/adobe-premiere/premiere-logo/premiere.png"
  );
  const [isActive, setIsActive] = useState("active");
  const [isPremium, setIsPremium] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const extensionData = {
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

    let collectionName = "";
    if (whichApp === "../img/adobe-premiere/premiere-logo/premiere.png") {
      collectionName = "premiere-pro";
    } else if (whichApp === "../img/after-effects/after-logo/after.png") {
      collectionName = "after-effects";
    } else if (whichApp === "../img/davinci-resolve/davinci-logo/davinci.png") {
      collectionName = "davinci-resolve";
    } else if (whichApp === "../img/windows/windows-logo/windows.png") {
      collectionName = "windows-x64bit";
    }

    const colRef = collection(db, collectionName);

    try {
      const docRef = await addDoc(colRef, extensionData);
      toast.success("New extension is added!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleClick = () => {
    setCategory("");
    setTitle("");
    setImage("");
    setDownload("");
    setHowTo("");
    setPrice(0);
    setRating("");
    setIsNew("new");
    setWhichApp("../img/adobe-premiere/premiere-logo/premiere.png");
    setIsActive("active");
    setIsPremium("");
  };

  return (
    <div className="bg-gray-900 h-svh">
      <form
        className="max-w-sm mx-auto bg-gray-800 p-5 justify-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded"
        onSubmit={handleSubmit}
      >
        <div className="flex">
          <button
            type="button"
            className="top-3 end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
            data-modal-hide="popup-modal"
            onClick={handleClick}
          >
            <svg
              className="w-6 h-6 text-white"
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
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>

            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <h3 className="text-white mb-3">Add a New Extension</h3>
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
            placeholder="Type the download url..."
            required
            value={download}
            onChange={(e) => setDownload(e.target.value)}
          />
        </div>

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
            htmlFor="whichApp"
            className="block mb-2 text-sm font-medium text-white"
          >
            Which App's Extension?
          </label>
          <div>
            <div className="py-2.5 px-2 text-sm font-medium text-center border rounded-s-lg focus:ring-4 focus:outline-none bg-gray-700 hover:bg-gray-600 focus:ring-gray-700 text-white border-gray-600">
              <div className="grid grid-cols-4 gap-5">
                <img
                  src="../img/adobe-premiere/premiere-logo/premiere.png"
                  className="w-20"
                />
                <img
                  src="../img/after-effects/after-logo/after.png"
                  className="w-20"
                />
                <img
                  src="../img/davinci-resolve/davinci-logo/davinci.png"
                  className="w-20"
                />
                <img
                  src="../img/windows/windows-logo/windows.png"
                  className="w-14"
                />
              </div>
            </div>
            <select
              id="whichApp"
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              value={whichApp}
              onChange={(e) => setWhichApp(e.target.value)}
            >
              <option value="../img/adobe-premiere/premiere-logo/premiere.png">
                Adobe Premiere Pro
              </option>
              <option value="../img/after-effects/after-logo/after.png">
                Adobe After Effects
              </option>
              <option value="../img/davinci-resolve/davinci-logo/davinci.png">
                Davinci Resolve
              </option>
              <option value="../img/windows/windows-logo/windows.png">
                Windows
              </option>
            </select>
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
          className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          Add Extension
        </button>
      </form>
    </div>
  );
};

export default CreateExtension;
