import { Link } from "react-router-dom";
import { ExploreSaladData } from "../Data/data";
import { SkeletonLoading } from "../Common";
import { useState } from "react";

export const ExploreSalad = () => {
  const [loading, setIsLoading] = useState(true);

  return (
    <div className="px-4 md:px-14 lg:px-32 xl:px-44 py-6 bg-white-500 ">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">
          Explore Our Most Loved Salads
        </h1>
        <Link
          to="/exploreSalad"
          className="text-lg bg-red-500 text-white-500 px-3 py-[6px] rounded-xl"
        >
          More
        </Link>
      </div>

      <div className="my-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {ExploreSaladData.slice(0, 6)?.map((item) => (
          <div className="country-Card" key={item.id}>
            <Link
              to={`/exploreSalad/${item.id}`}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className="border-4 border-red-500 size-24 sm:size-28 md:size-36 rounded-full overflow-hidden">
                {loading && <SkeletonLoading />}

                <img
                  src={item.img}
                  alt="Country"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 ease-in-out hover:scale-150"
                  onLoad={() => setIsLoading(false)}
                />
              </div>

              <p className="text-[18px] font-semibold text-black-600 mt-1">
                {item.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
