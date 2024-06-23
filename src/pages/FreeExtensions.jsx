import Card from "../components/Card";
import MiddleArticle from "../components/MiddleArticle";

const Apps = [
  {
    id: 1,
    name: "Adobe Premiere Pro",
    img: "../img/adobe-premiere/premiere-logo/premiere.png",
    desc: "Adobe Premiere Pro, film, TV ve web için videoları düzenlemek için kullanılan güçlü bir profesyonel video düzenleme yazılımıdır.",
    to: "/premiere-pro",
  },
  {
    id: 2,
    name: "Adobe After Effects",
    img: "../img/after-effects/after-logo/after.png",
    desc: "After Effects: Hareketli Grafikler ve Görsel Efektler Sihirbazı. After Effects, film, TV ve web için göz alıcı animasyonlar, görsel efektler ve hareketli grafikler oluşturmak için kullanılan bir yazılımdır",
    to: "/after-effects",
  },
  {
    id: 3,
    name: "Davinci Resolve",
    img: "../img/davinci-resolve/davinci-logo/davinci.png",
    desc: "DaVinci Resolve, video düzenleme, renk düzeltme, görsel efektler, hareketli grafikler ve ses post prodüksiyonu gibi post prodüksiyon sürecinin tüm aşamalarını tek bir programda birleştiren güçlü bir yazılımdır.",
    to: "/davinci-resolve",
  },
  {
    id: 4,
    name: "Windows Uygulamaları",
    img: "../img/windows/windows-logo/windows.png",
    desc: "Ücretsiz indirebileceğiniz windows uygulamaları.",
    to: "/windows-x64bit",
  },
];

const FreeExtensions = () => {
  return (
    <div className="text-center p-5 bg-gray-900 antialiased">
      <div className="mb-10 mt-5 m-5">
        <h1 className="mb-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-sky-300">
            Free
          </span>{" "}
          Apps
        </h1>
        <p className="text-lg font-normal lg:text-xl text-gray-400">
          For apps that most commonly used. Like Adobe Premiere Pro, Adobe After
          Effects or Davinci Resolve. Enjoy...
        </p>
      </div>

      <div>
        <div className="m-8 p-3 flex flex-row gap-5 justify-center">
          <Card Apps={Apps} />
        </div>
        <MiddleArticle />
      </div>
    </div>
  );
};

export default FreeExtensions;
