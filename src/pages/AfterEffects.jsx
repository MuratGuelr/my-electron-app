import AdobeExtensionCard from "../components/AdobeExtensionCard";
import PageTitles from "../components/PageTitles";

const AfterEffects = () => {
  return (
    <div className="bg-gray-950">
      <div className="mx-auto max-w-screen-2xl lg:py-6">
        <PageTitles title={"Adobe After Effects"} />
        <AdobeExtensionCard />
      </div>
    </div>
  );
};

export default AfterEffects;
