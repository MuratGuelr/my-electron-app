import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { toast } from "react-toastify";

const FavoriteApps = ({ appId, extension }) => {
  const [favorite, setFavorite] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [favoriteApp, setFavoriteApp] = useState([]);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserDetails(userData);
            setFavoriteApp(userData.favorites);
            setFavorite(
              userData.favorites?.some((app) => app.id === appId) || false
            );
            setUserID(userData.uid);
          } else {
            toast.error("User data not found");
          }
        } else {
          toast.error("User is not logged in");
        }
      });
    };
    fetchUserData();
  }, [appId]);

  const handleFavoriteToggle = async () => {
    if (userDetails) {
      const userDocRef = doc(db, "Users", auth.currentUser.uid);
      if (favorite) {
        await updateDoc(
          userDocRef,
          {
            favorites: arrayRemove(favoriteApp.find((app) => app.id === appId)),
          },
          toast.warning("Uygulama favorilerinizden çıkartıldı!")
        );
      } else {
        await updateDoc(
          userDocRef,
          {
            favorites: arrayUnion(extension),
          },
          toast.success("Uygulama favorilerinize Eklendi!")
        );
      }

      setFavorite(!favorite);
      const updatedDocSnap = await getDoc(userDocRef);
      if (updatedDocSnap.exists()) {
        setFavoriteApp(updatedDocSnap.data().favorites);
      }
    } else {
      toast.error("User not logged in or user data not found");
    }
  };

  return (
    <div className="-mt-2">
      <button onClick={handleFavoriteToggle} className="m-auto">
        {favorite ? (
          <>
            <MdFavorite className="text-red-600 shadow-white" size={34} />
            <MdFavorite
              className="text-red-600 shadow-white animate-ping absolute -mt-8 blur-xl opacity-50"
              size={34}
            />
          </>
        ) : (
          <>
            <MdFavoriteBorder size={34} className="text-gray-500" />
            <MdFavoriteBorder
              size={34}
              className="text-red-600 shadow-white animate-ping absolute -mt-8 blur-xl opacity-50"
            />
          </>
        )}
      </button>
    </div>
  );
};

export default FavoriteApps;
