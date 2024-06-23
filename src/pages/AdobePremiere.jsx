import AdobeExtensionCard from "../components/AdobeExtensionCard";
import PageTitles from "../components/PageTitles";

const AdobePremiere = () => {
  const PremiereExtensions = [
    {
      id: "1",
      title: "Premiere Composer",
      img: "../img/adobe-premiere/premiere-composer.jpg",
      download: "https://misterhorse.com/downloads/product-manager/win",
      howTo:
        "https://help.misterhorse.com/hc/en-us/articles/4405555986321-How-to-install-Animation-Composer",
      price: "Free",
      rating: "3",
      isNew: true,
      whichApp: "../img/adobe-premiere/premiere-logo/premiere.png",
      isActive: false,
      isPremium: false,
      filterMethod: "free",
    },
    {
      id: "2",
      title: "Essential Motion v3",
      img: "../img/adobe-premiere/essential-motion-v3.jpg",
      download:
        "https://drive.google.com/drive/folders/1xq3XfH9wTVnIO8hhrelSwpTRhtvdRVTn?usp=sharing",
      howTo: "https://www.youtube.com/watch?v=ZuuDPV-EDuo",
      price: "Free",
      rating: "1",
      isNew: false,
      whichApp: "../img/adobe-premiere/premiere-logo/premiere.png",
      isPremium: true,
      filterMethod: "premium-free",
    },
    {
      id: "3",
      title: "Drag Zoom Pro v1.1.7",
      img: "../img/adobe-premiere/drag-zoom-pro.png",
      download:
        "https://drive.google.com/drive/folders/17MZ1FkG8SRPnlBc3DyP_M3US8AKJcn65?usp=sharing",
      howTo: "https://www.youtube.com/watch?v=mag-A49J7Cw",
      price: "50₺",
      rating: "5",
      isNew: true,
      whichApp: "../img/adobe-premiere/premiere-logo/premiere.png",
      isPremium: true,
      filterMethod: "premium-price",
    },
    {
      id: "4",
      title: "AEJuice Starter Pack",
      img: "../img/adobe-premiere/aejuice-starter-pack.jpg",
      download:
        "https://github.com/aejuicellc/pack-manager/releases/download/24.01.1107/pack_manager_installer.zip",
      howTo: "https://www.youtube.com/watch?v=JvuIy-qjUCo",
      price: "Free",
      rating: "5",
      isNew: true,
      whichApp: "../img/adobe-premiere/premiere-logo/premiere.png",
      isPremium: false,
      filterMethod: "free",
    },
    {
      id: "5",
      title: "Spunkram Library - Free Version",
      img: "../img/adobe-premiere/spunkram-library-free.jpg",
      download:
        "https://drive.google.com/drive/folders/1S6QhlD5iseO_AFhLZ_LSlBNNjSBgRUhh?usp=sharing",
      howTo: "https://www.spunkram.com/",
      price: "Free",
      rating: "4",
      isNew: true,
      whichApp: "../img/adobe-premiere/premiere-logo/premiere.png",
      isPremium: false,
      filterMethod: "free",
    },
  ];

  return (
    <div className="p-12 h-svh bg-gray-900">
      <div>
        <PageTitles title={"Adobe Premiere Pro"} />
        <AdobeExtensionCard PremiereExtensions={PremiereExtensions} />
      </div>
    </div>
  );
};

export default AdobePremiere;
