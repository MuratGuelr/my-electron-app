import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { auth, db } from "../firebase/firebase";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";

const ListImages = ({ images, setImages }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [userUid, setUserUid] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const unsubscribeSnapshot = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            setUserDetails(doc.data());
            setUserUid(user.uid);
          } else {
          }
        });

        return () => unsubscribeSnapshot();
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userDetails) {
      const storage = getStorage();
      const storageRef = ref(storage, userUid);

      listAll(storageRef)
        .then((res) => {
          const promises = res.items.map((itemRef) => getDownloadURL(itemRef));
          Promise.all(promises)
            .then((urls) => {
              setImages(urls);
            })
            .catch((error) => {
              console.error("Error getting download URLs:", error);
            });
        })
        .catch((error) => {
          console.error("Error listing images:", error);
        });
    }
  }, [userDetails]);

  const handleClick = async (url) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (userDetails.profilePicture === url) {
      toast.error("Profile picture is the same!");
    } else {
      if (user) {
        const db = getFirestore();
        const docRef = doc(db, "Users", user.uid);
        await setDoc(docRef, { profilePicture: url }, { merge: true });
        toast.success("Profile picture updated successfully!");
      } else {
        toast.error("Please login first!");
      }
    }
  };

  const handleDelete = async (url) => {
    const storage = getStorage();
    const imageRef = ref(storage, url);

    deleteObject(imageRef)
      .then(() => {
        setImages((prevImages) => prevImages.filter((image) => image !== url));
        toast.success("Image deleted successfully!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      {userDetails ? (
        <>
          <div className="grid grid-cols-3 gap-3 p-2">
            {images.map((url, index) => (
              <div key={index}>
                <TiDelete
                  size={24}
                  className="cursor-pointer text-gray-950 shadow-2xl hover:text-red-600 transition-all absolute"
                  onClick={() => handleDelete(url)}
                />
                <img
                  className="cursor-pointer hover:ring hover:shadow-2xl h-16 object-cover rounded"
                  src={url}
                  alt={`User ${index + 1} image`}
                  onClick={() => handleClick(url)}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ListImages;
