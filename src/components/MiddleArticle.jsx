import { Link } from "react-router-dom";

const MiddleArticle = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8 hover:bg-gray-700 transition-all">
            <Link
              to="/premiere-pro"
              className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-2"
            >
              <svg
                className="w-2.5 h-2.5 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
              </svg>
              Adobe Premiere Pro
            </Link>
            <Link to="/premiere-pro">
              <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
                Adobe Premiere Pro: Video Editing Software for Professionals
              </h1>
              <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
                Adobe Premiere Pro is a video editing software used by
                professionals such as filmmakers, television broadcasters, and
                YouTubers. With a wide range of features, Premiere Pro allows
                you to do everything from simple cutting and pasting to advanced
                color correction and visual effects.
              </p>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 hover:bg-gray-700 transition-all">
              <Link
                to="/after-effects"
                className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-2"
              >
                <svg
                  className="w-2.5 h-2.5 me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M17 11h-2.722L8 17.278a5.512 5.512 0 0 1-.9.722H17a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1ZM6 0H1a1 1 0 0 0-1 1v13.5a3.5 3.5 0 1 0 7 0V1a1 1 0 0 0-1-1ZM3.5 15.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM16.132 4.9 12.6 1.368a1 1 0 0 0-1.414 0L9 3.55v9.9l7.132-7.132a1 1 0 0 0 0-1.418Z" />
                </svg>
                After Effects
              </Link>
              <Link to="/after-effects">
                <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                  After Effects: Professional Software for Motion Graphics and
                  Visual Effects
                </h2>
                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                  After Effects is a program included in Adobe Creative Cloud
                  and used for animation and motion graphics design. Frequently
                  preferred by professional animators, designers, video editors
                  and other media professionals, After Effects offers users a
                  variety of tools, effects and animations to be used in motion
                  graphics design.
                </p>
              </Link>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 hover:bg-gray-700 transition-all">
              <Link
                to="/davinci-resolve"
                className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2"
              >
                <svg
                  className="w-2.5 h-2.5 me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
                  />
                </svg>
                Davinci Resolve
              </Link>
              <Link to="/davinci-resolve">
                <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                  DaVinci Resolve: Professional Software for Video Editing,
                  Color Correction & Visual Effects
                </h2>
                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                  DaVinci Resolve is a software suite for editing, color
                  correction, visual effects, and audio post production.
                  Developed by Blackmagic Design, it comes in both free and paid
                  versions. The free version offers a wide range of features,
                  while the paid version unlocks even more advanced capabilities
                  like Fairlight audio mixing, Fusion visual effects, and
                  multi-GPU support.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MiddleArticle;
