import AdobeExtensionCard from "../components/AdobeExtensionCard";
import PageTitles from "../components/PageTitles";

const DavinciResolve = () => {
  return (
    <div className="p-12 min-h-screen bg-gray-900">
      <div>
        <PageTitles title={"Davinci Resolve"} />
        <AdobeExtensionCard />
      </div>
    </div>
  );
};

export default DavinciResolve;
