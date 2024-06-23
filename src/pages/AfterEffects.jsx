import AdobeExtensionCard from "../components/AdobeExtensionCard";
import PageTitles from "../components/PageTitles";

const AfterEffects = () => {
  return (
    <div className="p-12 h-svh bg-gray-900">
      <div>
        <PageTitles title={"Adobe After Effects"} />
        <AdobeExtensionCard />
      </div>
    </div>
  );
};

export default AfterEffects;
