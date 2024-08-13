import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { toast } from "react-toastify";
import BringFavoriteApps from "../components/BringFavoriteApps";

const Favorites = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [favoriteApps, setFavoriteApps] = useState([]);

  const PremierePro = "./src/assets/adobe-premiere/premiere-logo/premiere.png";
  const AfterEffects = "./src/assets/after-effects/after-logo/after.png";
  const DavinciResolve =
    "./src/assets/davinci-resolve/davinci-logo/davinci.png";
  const Windowsx64 = "./src/assets/windows/windows-logo/windows.png";

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
