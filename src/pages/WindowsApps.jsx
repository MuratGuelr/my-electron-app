import React from "react";
import AdobeExtensionCard from "../components/AdobeExtensionCard";
import PageTitles from "../components/PageTitles";

const WindowsApps = () => {
  return (
    <div className="p-12 min-h-screen bg-gray-900">
      <div>
        <PageTitles title={"Windows Uygulamaları"} />
        <AdobeExtensionCard />
      </div>
    </div>
  );
};

export default WindowsApps;
