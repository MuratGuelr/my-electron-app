import HomePageSlider from "../components/HomePageSlider";
import HomePageTitle from "../components/HomePageTitle";
import MiddleArticle from "../components/MiddleArticle";

const HomePage = () => {
  return (
    <div className="p-5 bg-white dark:bg-gray-900 antialiased justify-center">
      <HomePageSlider />
      <HomePageTitle />
      <MiddleArticle />
    </div>
  );
};

export default HomePage;
