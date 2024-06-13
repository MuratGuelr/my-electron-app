import React, { useState } from "react";

const ToggleBar = ({ setChosenOptions }) => {
  const [chosenOption, setChosenOption] = useState("");

  const handleChange = (e) => {
    setChosenOptions(e.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mr-5 mt-2">
        <label htmlFor="underline_select" className="sr-only">
          Underline select
        </label>
        <select
          id="underline_select"
          className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          value={chosenOption}
          onChange={handleChange}
        >
          <option value="" defaultValue>
            Choose an Option
          </option>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
          <option value="premium-free">Premium - Free</option>
          <option value="premium-price">Premium - Price</option>
        </select>
      </div>
    </form>
  );
};

export default ToggleBar;
