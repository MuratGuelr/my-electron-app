import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { toast } from "react-toastify";
import BringFavoriteApps from "../components/BringFavoriteApps";

const Favorites = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [favoriteApps, setFavoriteApps] = useState([]);

  const PremierePro =
    "https://firebasestorage.googleapis.com/v0/b/download-ap.appspot.com/o/windows-x64bit%2FAppLogos%2Fpremiere.png?alt=media&token=6291c7a0-5916-4497-9eff-9a7ff7b581f3";
  const AfterEffects =
    "https://firebasestorage.googleapis.com/v0/b/download-ap.appspot.com/o/windows-x64bit%2FAppLogos%2Fafter.png?alt=media&token=e6066871-2926-4b05-95bf-ba7fc460f120";
  const DavinciResolve =
    "https://firebasestorage.googleapis.com/v0/b/download-ap.appspot.com/o/windows-x64bit%2FAppLogos%2Fdavinci.png?alt=media&token=05d16445-d52a-4136-ab67-df4b6b1ffb1f";
  const Windowsx64 =
    "https://firebasestorage.googleapis.com/v0/b/download-ap.appspot.com/o/windows-x64bit%2FAppLogos%2Fwindows.png?alt=media&token=a624fd66-f515-446b-83c2-1db99737f3c0";

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

  return (
    <div className="p-12 bg-gray-900 antialiased justify-center text-white min-h-screen">
      <div>
        {favoriteApps && favoriteApps.length > 0 ? (
          <>
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-extrabold text-white md:text-5xl lg:text-6xl">
                Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-sky-300">
                  Favorites
                </span>
              </h1>
            </div>

            <BringFavoriteApps
              favoriteApps={favoriteApps}
              AppType={PremierePro}
            />
            <BringFavoriteApps
              favoriteApps={favoriteApps}
              AppType={AfterEffects}
            />
            <BringFavoriteApps
              favoriteApps={favoriteApps}
              AppType={DavinciResolve}
            />
            <BringFavoriteApps
              favoriteApps={favoriteApps}
              AppType={Windowsx64}
            />
          </>
        ) : (
          <div className="mb-10 m-5 text-center">
            <h1 className="mb-4 text-2xl font-extrabold text-white md:text-3xl lg:text-5xl">
              There are no{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-sky-300">
                Favorites
              </span>
              😔
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
