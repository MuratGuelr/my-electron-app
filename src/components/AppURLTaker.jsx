import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React from "react";

const AppURLTaker = () => {
  let adobeApps = "adobe-premiere/";
  let afterApps = "after-effects/";
  let davinciApps = "davinci/";
  let windowsApps = "windows-x64bit/AppLogos/";

  let appName = "app.ico";

  const storage = getStorage();
  const imageRef = ref(storage, `${windowsApps}${appName}`);

  // Firebase Storage'dan URL'yi al
  getDownloadURL(imageRef)
    .then((url) => {
      console.log("Download URL:", url);
      // Bu URL'yi direkt olarak programda image alanına atayabilirsiniz
    })
    .catch((error) => {
      console.error("Error getting download URL:", error);
    });

  return <></>;
};

export default AppURLTaker;
