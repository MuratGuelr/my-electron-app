import Card from "../components/Card";
import MiddleArticle from "../components/MiddleArticle";

const Apps = [
  {
    id: 1,
    name: "Adobe Premiere Pro",
    img: "https://firebasestorage.googleapis.com/v0/b/download-ap.appspot.com/o/windows-x64bit%2FAppLogos%2Fpremiere.png?alt=media&token=6291c7a0-5916-4497-9eff-9a7ff7b581f3",
    desc: "Adobe Premiere Pro, film, TV ve web için videoları düzenlemek için kullanılan güçlü bir profesyonel video düzenleme yazılımıdır.",
    to: "/premiere-pro",
  },
  {
    id: 2,
    name: "Adobe After Effects",
    img: "https://firebasestorage.googleapis.com/v0/b/download-ap.appspot.com/o/windows-x64bit%2FAppLogos%2Fafter.png?alt=media&token=e6066871-2926-4b05-95bf-ba7fc460f120",
    desc: "After Effects: Hareketli Grafikler ve Görsel Efektler Sihirbazı. After Effects, film, TV ve web için göz alıcı animasyonlar, görsel efektler ve hareketli grafikler oluşturmak için kullanılan bir yazılımdır",
    to: "/after-effects",
  },
  {
    id: 3,
    name: "Davinci Resolve",
    img: "https://firebasestorage.googleapis.com/v0/b/download-ap.appspot.com/o/windows-x64bit%2FAppLogos%2Fdavinci.png?alt=media&token=05d16445-d52a-4136-ab67-df4b6b1ffb1f",
    desc: "DaVinci Resolve, video düzenleme, renk düzeltme, görsel efektler, hareketli grafikler ve ses post prodüksiyonu gibi post prodüksiyon sürecinin tüm aşamalarını tek bir programda birleştiren güçlü bir yazılımdır.",
    to: "/davinci-resolve",
  },
  {
    id: 4,
    name: "Windows Uygulamaları",
    img: "https://firebasestorage.googleapis.com/v0/b/download-ap.appspot.com/o/windows-x64bit%2FAppLogos%2Fwindows.png?alt=media&token=a624fd66-f515-446b-83c2-1db99737f3c0",
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
          Effects, Davinci Resolve and Windows x64. Enjoy...
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
