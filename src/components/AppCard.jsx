import React from "react";

const AppCard = ({ cards }) => {
  return (
    <>
      {cards.map((card) => (
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href={card.download}>
            <img
              class="p-8 rounded-t-lg border-red-500 border"
              src={card.img}
              alt="product image"
            />
          </a>
          <div class="px-8 pb-8">
            <h5 class="text-3xl font-semibold text-center tracking-tight text-gray-900 dark:text-white -mt-3 bg-red-500 inline-block p-2">
              {card.title}
            </h5>

            <div class="flex items-center justify-between">
              <span class="text-3xl font-bold text-gray-900 dark:text-white">
                {card.bit}
              </span>
              <a
                href={card.download}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AppCard;
