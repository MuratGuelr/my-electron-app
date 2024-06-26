import HomePageTitle from "../components/HomePageTitle";
import MiddleArticle from "../components/MiddleArticle";

const HomePage = () => {
  return (
    <div className="p-5 bg-gray-900 antialiased justify-center">
      <HomePageTitle />
      <MiddleArticle />
    </div>
  );
};

export default HomePage;
