import AppCard from "../components/AppCard";

const HomePage = () => {
  const cards = [
    {
      img: "https://www.audacityteam.org/_astro/Audacity_Logo.63b57726.svg",
      title: "Audacity",
      desc: "Audacity is the world's most popular audio editing and recording app",
      download:
        "https://github.com/audacity/audacity/releases/download/Audacity-3.5.1/audacity-win-3.5.1-64bit.exe",
      bit: "x64",
    },
    {
      img: "https://www.audacityteam.org/_astro/Audacity_Logo.63b57726.svg",
      title: "Audacity",
      desc: "Audacity is the world's most popular audio editing and recording app",
      download:
        "https://github.com/audacity/audacity/releases/download/Audacity-3.5.1/audacity-win-3.5.1-64bit.exe",
      bit: "x64",
    },
  ];

  return (
    <div className="bg-gray-900 h-full">
      <div className="flex flex-grow gap-5">
        <AppCard cards={cards} />
      </div>
    </div>
  );
};

export default HomePage;
