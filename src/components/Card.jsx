import { Link } from "react-router-dom";
import Image from "./Image";

const Card = ({ Apps }) => {
  return (
    <>
      {Apps.map((app) => (
        <div
          className="w-96 border shadow bg-gray-800 border-gray-700 transition-all duration-300 rounded-3xl cursor-pointer filter grayscale hover:grayscale-0"
          key={app.id}
        >
          <Link to={app.to}>
            <Image image={app.img} />
          </Link>
          <div className="p-5">
            <Link to={app.to}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                {app.name}
              </h5>
            </Link>
            <p className="mb-3 font-normal text-gray-400">{app.desc}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
