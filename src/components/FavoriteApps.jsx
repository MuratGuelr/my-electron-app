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
            setFavorite(userData.favorites?.includes(appId) || false);
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
            favorites: arrayRemove(extension),
          },
          toast.error("Uygulama favorilerinizden çıkartıldı!")
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
    } else {
      toast.error("User not logged in or user data not found");
    }
  };

  return (
    <div className="absolute left-1/2 -mt-8">
      <button onClick={handleFavoriteToggle} className="text-white">
        {favorite ? (
          <>
            {favoriteApp.map((e) => {
              {
                e.title === extension.title ? (
                  <button>
                    <MdFavorite size={24} />
                  </button>
                ) : (
                  <button>
                    <MdFavorite size={24} />
                  </button>
                );
              }
            })}
          </>
        ) : (
          <button>
            <MdFavoriteBorder size={24} />
          </button>
        )}
      </button>
    </div>
  );
};

export default FavoriteApps;
