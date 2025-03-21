import { Link } from "react-router-dom";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import ImageComponent from "../Common/ImageComponent";
import { useSelector } from "react-redux";

export const PopuralSalad = () => {
  const { popularData } = useSelector((state) => state.salad);

  return (
    <div className="px-4 md:px-14 lg:px-34 xl:px-44 py-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">
          Most Popular Salad Picks
        </h1>
        <Link
          to="/popuralSalad"
          className="text-lg bg-red-500 text-white-500 px-3 py-[6px] rounded-xl"
        >
          More
        </Link>
      </div>
      <div className="my-8 grid mm:grid-cols-2 lg:grid-cols-4  gap-4 ">
        {popularData?.slice(0, 4).map((item) => (
          <div className="country-Card" key={item.id}>
            <Link
              to={`/popuralSalad/${item?.uid}`}
              className="flex flex-col items-left justify-left gap-2"
            >
              <ImageComponent
                src={item?.image}
                imgCss="object-cover transition-transform duration-500 ease-in-out hover:scale-150"
                cardCss="w-full h-[22vh]  md:h-[26vh] lg:h-[28vh] xl:h-[32vh] rounded-lg shadow-xl overflow-hidden"
              />

              <p className="text-[18px] font-semibold text-black-600 mt-1">
                {item.name}
              </p>
              <p className="text-[16px] font-semibold text-black-600 flex items-center gap-1">
                <StarsRoundedIcon className="text-green-600 " />{" "}
                {item?.rating || 4.2}{" "}
                <WhatshotRoundedIcon className="text-green-600 ml-2" />{" "}
                {item?.calories || 200} Kcal
              </p>
              <div className="text-sm  text-black-400 flex gap-1 flex-wrap  ">
                {item?.ingredients?.map((ing, index) => (
                  <p key={index}>{ing?.name},</p>
                ))}
              </div>
              <p className="text-sm  text-black-200 ">{item.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
