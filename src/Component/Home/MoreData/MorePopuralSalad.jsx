import { Link } from "react-router-dom";
import { PopularSaladData } from "../../Data/data";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import { useState } from "react";
import { SkeletonLoading } from "../../Common";
export const MorePopuralSalad = () => {
  const [loading, setIsLoading] = useState(true);

  return (
    <div className="px-4 md:px-14 lg:px-34 xl:px-44 py-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">
          Most Popular Salad Picks
        </h1>
      </div>
      <div className="my-8 grid mm:grid-cols-2 lg:grid-cols-3  gap-8 ">
        {PopularSaladData?.map((item) => (
          <div className="country-Card" key={item.id}>
            <Link
              to={`/popuralSalad/${item?.id}`}
              className="flex flex-col items-left justify-left gap-2"
            >
              <div className=" w-full h-[22vh]  md:h-[26vh] lg:h-[28vh] xl:h-[32vh] rounded-lg shadow-xl overflow-hidden">
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
              <p className="text-[16px] font-semibold text-black-600 flex items-center gap-1">
                <StarsRoundedIcon className="text-green-600 " /> {item?.rating}{" "}
                <WhatshotRoundedIcon className="text-green-600 ml-2" />{" "}
                {item?.calories}
              </p>
              <p className="text-sm  text-black-400 flex gap-1  ">
                {item?.ingredients?.map((ing, index) => (
                  <p key={index}>{ing?.title},</p>
                ))}
              </p>
              <p className="text-sm  text-black-200 ">{item.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
