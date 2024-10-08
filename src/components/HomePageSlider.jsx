import React from "react";
import { Link } from "react-router-dom";

const HomePageSlider = () => {
  const HomeNewExtensions = [
    {
      id: "1",
      title: "Premiere Composer",
      to: "/premiere-composer",
      img: "https://d23mmnx9ld45h.cloudfront.net/misterhorse.com_web_v3/Products/Premiere%20Composer/section-art-base-premiere-composer-1.jpg",
      isNew: true,
      haveLink: true,
      whichApp:
        "https://d23mmnx9ld45h.cloudfront.net/misterhorse.com_web_v3/Products/Premiere%20Composer/section-art-base-premiere-composer-1.jpg",
    },
    {
      id: "2",
      title: "Essential Motion v3",
      to: "/essential-motion-v3",
      img: "../img/adobe-premiere/essential-motion-v3.jpg",
      isNew: true,
      haveLink: true,
      whichApp:
        "https://d23mmnx9ld45h.cloudfront.net/misterhorse.com_web_v3/Products/Premiere%20Composer/section-art-base-premiere-composer-1.jpg",
    },
    {
      id: "3",
      title: "Drag Zoom Pro v1.1.7",
      to: "/drag-zoom-pro",
      img: "../img/adobe-premiere/drag-zoom-pro.png",
      isNew: true,
      haveLink: true,
      whichApp:
        "https://d23mmnx9ld45h.cloudfront.net/misterhorse.com_web_v3/Products/Premiere%20Composer/section-art-base-premiere-composer-1.jpg",
    },
    {
      id: "4",
      title: "AEJuice Starter Pack",
      to: "/aejuice-starter-pack",
      img: "https://d23mmnx9ld45h.cloudfront.net/misterhorse.com_web_v3/Products/Premiere%20Composer/section-art-base-premiere-composer-1.jpg",
      isNew: true,
      whichApp: "premiere",
    },
    {
      id: "5",
      title: "Spunkram Library - Free Version",
      to: "/spunkram-library-free",
      img: "https://d23mmnx9ld45h.cloudfront.net/misterhorse.com_web_v3/Products/Premiere%20Composer/section-art-base-premiere-composer-1.jpg",
      isNew: true,
      whichApp: "premiere",
    },
  ];

  return (
    <>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-12">
        <div className="mx-auto p-11 -mt-20 -mb-6">
          <figure className="transition-all duration-300 cursor-pointer mb-2">
            {HomeNewExtensions[0].isNew ? (
              <div className="absolute inline-flex items-center justify-center w-20 h-10 text-xl font-bold bg-green-900 text-green-300 border-2 rounded border-gray-900 z-20">
                New
              </div>
            ) : (
              ""
            )}
            <Link to={HomeNewExtensions[0].to}>
              <img
                src={HomeNewExtensions[0].whichApp}
                className="absolute h-11 mt-12 ml-2"
              />
              <img
                className="h-auto max-w-full transition-all duration-300 rounded-lg cursor-pointer"
                src={HomeNewExtensions[0].img}
              />
              <figcaption className="-mt-16 ml-3 px-4 text-3xl text-white text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-sky-300 font-bold">
                <p>{HomeNewExtensions[0].title}</p>
              </figcaption>
            </Link>
          </figure>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-5">
          {HomeNewExtensions.splice(1, 4).map((extension) => (
            <div
              key={extension.id}
              className={
                extension.isNew
                  ? "transition-all duration-400"
                  : "filter grayscale hover:grayscale-0 transition-all duration-400"
              }
            >
              <Link to={extension.to}>
                {extension.isNew ? (
                  <span className="absolute text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-green-900 text-green-300 z-2 mt-1 ml-1">
                    New{" "}
                  </span>
                ) : (
                  ""
                )}
                <img
                  src={extension.whichApp}
                  className="absolute h-7 mt-8 ml-2"
                />
                <img
                  className="h-auto max-w-full transition-all duration-300 rounded-lg cursor-pointer"
                  src={extension.img}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePageSlider;
