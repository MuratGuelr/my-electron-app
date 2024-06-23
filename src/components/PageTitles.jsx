import React from "react";

const PageTitles = ({ title }) => {
  return (
    <div className="text-center">
      <h1 className="mb-2 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">
        {title}
      </h1>
      <p className="mb-2 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">
        Here at download apps we focus on giving free apps to you guys.
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-sky-300 font-bold">
          "Free Apps"
        </span>
      </p>
    </div>
  );
};

export default PageTitles;
