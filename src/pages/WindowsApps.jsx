import React from "react";
import AdobeExtensionCard from "../components/AdobeExtensionCard";
import PageTitles from "../components/PageTitles";

const WindowsApps = () => {
  return (
    <div className="bg-gray-950">
      <div className="mx-auto max-w-screen-2xl lg:py-6">
        <PageTitles title={"Windows Uygulamaları"} />
        <AdobeExtensionCard />
      </div>
    </div>
  );
};

export default WindowsApps;
