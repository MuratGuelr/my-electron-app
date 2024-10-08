import React, { useEffect, useState } from "react";
import AvatarProfile from "../components/AvatarProfile";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router";
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { FaFileUpload } from "react-icons/fa";
import ListImages from "../components/ListImages";

const Profile = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [loggedIn, setLoggedIn] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [settings, setSettings] = useState(false);

  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [darkMode, setDarkMode] = useState("");

  const [file, setFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [images, setImages] = useState([]);

  const userProfile = {
    firstName: fname,
    lastName: lname,
    username: username,
    darkMode: darkMode,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const unsubscribeSnapshot = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setUserDetails(doc.data());
            const userData = doc.data();
            setFname(userData.firstName);
            setLname(userData.lastName);
            setUsername(userData.username);
            setDarkMode(userData.darkMode);
          } else {
            setLoggedIn("User is not logged in!");
          }
        });

        return () => unsubscribeSnapshot();
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login");
      location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleCreate() {
    navigate("/create-extension");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        const userData = doc(db, "Users", user.uid);
        await updateDoc(userData, userProfile);
        setSettings(false);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const ACCEPTED_FILE_TYPES = ["image/svg+xml", "image/png", "image/jpeg"];
  const MAX_FILE_SIZE_MB = 1;
  const MAX_IMAGE_WIDTH = 1920;
  const MAX_IMAGE_HEIGHT = 1080;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
      toast.error("Please select a (SVG, PNG or JPEG/JPG) file!");
      setFile(null);
      return;
    }
    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      toast.error("Please select a file under 1mb!");
      setFile(null);
      return;
    }
    if (selectedFile.type.startsWith("image/")) {
      const img = new Image();
      img.onload = () => {
        if (img.width > MAX_IMAGE_WIDTH || img.height > MAX_IMAGE_HEIGHT) {
          toast.error(
            "Please select a file resolution equal 1920x1080px or lower!"
          );
          setFile(null);
          return;
        }
        setFile(selectedFile);
      };
      img.src = URL.createObjectURL(selectedFile);
    } else {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        if (images.length < 3) {
          const storage = getStorage();
          const db = getFirestore();
          const docRef = doc(db, "Users", user.uid);
          const storageRef = ref(storage, `${user.uid}/${file.name}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          setDownloadURL(url);
          await setDoc(docRef, { profilePicture: url }, { merge: true });
          toast.success("Profile picture uploaded successfully!");
        } else {
          toast.error("You can't have more then '3' Images!");
        }
      }
    } else {
      toast.error("No file selected!");
    }
  };

  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getFirestore();
      const docRef = doc(db, "Users", user.uid);

      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          if (userData.profilePicture) {
            setProfilePicture(userData.profilePicture);
          }
        }
      });

      return () => unsubscribe();
    }
  }, []);

  return (
    <div className="bg-gray-900 rounded min-h-screen">
      {settings ? (
        <>
          {userDetails ? (
            <form onSubmit={handleSubmit}>
              <div className="w-1/4 border rounded-lg shadow bg-gray-800 border-gray-700 m-auto scale-90">
                <div>
                  <div className="flex text-xl font-semibold tracking-tight text-gray-900bg-gray-800 text-white p-2">
                    <button type="button" onClick={() => setSettings(false)}>
                      <svg
                        className="w-6 h-6 ml-4 mt-2 text-white cursor-pointer"
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
                    <button
                      type="button"
                      className="top-3 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                      data-modal-hide="popup-modal"
                      onClick={handleSubmit}
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
                          d="M5 11.917 9.724 16.5 19 7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex px-4">
                  <div className="flex flex-col items-center pb-10">
                    <div>
                      {userDetails.profilePicture && (
                        <AvatarProfile
                          bigClass={true}
                          url={userDetails.profilePicture}
                        />
                      )}
                      <div>
                        <ListImages images={images} setImages={setImages} />
                      </div>
                    </div>
                    <div className="mt-4 inline-flex gap-2">
                      <input
                        className="block w-full text-sm h-7  border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        onChange={handleFileChange}
                      />

                      <button className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 ring-blue-800">
                        <FaFileUpload size={18} onClick={handleUpload} />
                      </button>
                    </div>
                    <p
                      className="mt-2 text-xs text-gray-300"
                      id="file_input_help"
                    >
                      SVG, PNG, JPEG/JPG (MAX. 1mb, 1920x1080px).
                    </p>
                    <div className="mb-1 text-xl font-medium  text-white ml-5 mt-5">
                      <div className="flex w-auto gap-2">
                        <label
                          htmlFor="fname"
                          className="block mb-2 text-sm font-medium text-white"
                        >
                          Name & Surname
                        </label>
                      </div>

                      <div className="flex w-auto gap-2">
                        <input
                          type="text"
                          id="fname"
                          className="shadow-sm border   text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
                          placeholder=""
                          required
                          value={fname}
                          onChange={(e) => setFname(e.target.value)}
                        />
                        <input
                          type="text"
                          id="lname"
                          className="shadow-sm border   text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
                          placeholder=""
                          required
                          value={lname}
                          onChange={(e) => setLname(e.target.value)}
                        />
                      </div>
                    </div>
                    <span className="text-l text-gray-400 ml-5">
                      {isPremium ? "Premium User" : "Free User"}
                    </span>
                    <div>
                      <div className="mb-3 mt-5 text-l font-medium text-l text-gray-400 flex gap-2 justify-center">
                        <span className="mt-2">Username :</span>
                        <input
                          type="text"
                          id="username"
                          className="shadow-sm border   text-sm rounded-lg block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <h5 className="mb-3 text-l font-medium text-l text-gray-400 ml-5">
                        Email :{" "}
                        <span className="text-white">{userDetails.email}</span>
                      </h5>
                      <div className="mb-3 text-l font-medium text-l text-gray-400 ml-5">
                        Dark Mode :{" "}
                        <span className="text-white">
                          {userDetails.darkMode ? (
                            <button
                              className="hover:bg-gray-600 p-2 rounded-md"
                              onClick={() => setDarkMode(false)}
                            >
                              <MdOutlineDarkMode />
                            </button>
                          ) : (
                            <button
                              className="hover:bg-gray-600 p-2 rounded-md"
                              onClick={() => setDarkMode(true)}
                            >
                              <MdDarkMode />
                            </button>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 ml-5 flex gap-2">
                      <button
                        type="submit"
                        className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <>
          {userDetails ? (
            <div className="bg-gray-900 w-screen h-screen">
              <div className="max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div>
                  <div className="flex text-xl font-semibold tracking-tight bg-gray-800 text-white">
                    <button type="button" onClick={() => setSettings(true)}>
                      <svg
                        className="w-6 h-6 ml-4 mt-2 text-white cursor-pointer"
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
                    {userDetails.darkMode ? (
                      <button className="w-8 h-8 ml-36 mt-2 cursor-default">
                        <MdOutlineDarkMode />
                      </button>
                    ) : (
                      <button className="w-8 h-8 ml-36 mt-2 cursor-default">
                        <MdDarkMode />
                      </button>
                    )}
                    <button
                      type="button"
                      className="top-3 end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white mt-2 mr-3"
                      data-modal-hide="popup-modal"
                      onClick={handleLogout}
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
                <div className="flex justify-end px-6 pt-4">
                  <div className="flex flex-col items-center pb-10">
                    <div>
                      {userDetails.profilePicture && (
                        <AvatarProfile
                          bigClass={true}
                          url={userDetails.profilePicture}
                        />
                      )}
                      <ListImages images={images} setImages={setImages} />
                    </div>
                    <h5 className="mb-1 text-xl font-medium text-white ml-5 mt-5">
                      {userDetails.firstName + " " + userDetails.lastName}
                    </h5>
                    <span className="text-l text-gray-400 ml-5">
                      {isPremium ? "Premium User" : "Free User"}
                    </span>

                    <div>
                      <h5 className="mb-3 mt-5 text-l font-medium text-l text-gray-400">
                        Username :{" "}
                        <span className="text-white">
                          {userDetails.username}
                        </span>
                      </h5>
                      <h5 className="mb-3 text-l font-medium text-l text-gray-400 ml-5">
                        Email :{" "}
                        <span className="text-white">{userDetails.email}</span>
                      </h5>
                    </div>

                    <div className="mt-5 ml-5 flex gap-2">
                      {userDetails.email === "murat@g.com" && (
                        <>
                          <button
                            type="submit"
                            className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5  bg-green-600 hover:bg-green-700 focus:ring-green-800"
                            onClick={handleCreate}
                          >
                            Create New Extension
                          </button>
                        </>
                      )}
                      <button
                        type="submit"
                        className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </>
      )}
    </div>
  );
};
export default Profile;
