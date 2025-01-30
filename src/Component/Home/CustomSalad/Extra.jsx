import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useSaladContext } from "../../SaladContextApi/SaladContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SkeletonLoading } from "../../Common";
export const Extra = () => {
  const { state, dispatch } = useSaladContext();
  const [loading, setIsLoading] = useState(true);

  // console.log(state.createRecipe[3].extra);

  const handleExtraSelection = (id) => {
    if (state.createRecipe[3].extra.find((item) => item.id === id)) {
      dispatch({
        type: "REMOVE_ITEM_FROM_RECIPE",
        payload: { type: "extra", id: id },
      });
    } else {
      const extraData = state.extra.find((i) => i.id === id);
      dispatch({
        type: "CREATE_RECIPE",
        payload: { type: "EXTRA", data: extraData },
      });
    }
  };
  return (
    <div className="my-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-black-600">
          {" "}
          <MoreHorizRoundedIcon className="text-green-500" /> Extra
        </h3>
        <Link
          to="/recepi/extra"
          className="text-lg bg-red-500 text-white-500 px-3 py-[6px] rounded-xl"
        >
          More
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 mm:grid-cols-2 gap-6  ">
        {state.extra.slice(0, 4).map((item) => (
          <div className="mt-8" key={item.id}>
            <div
              className={`cursor-pointer rounded-lg shadow-lg  p-4 ${
                state.createRecipe[3].extra.some((i) => i.id === item.id)
                  ? "border-4 border-green-500"
                  : ""
              }`}
              onClick={() => handleExtraSelection(item.id)}
            >
              <div className="w-full  h-[22vh]  md:h-[26vh] lg:h-[28vh] xl:h-[32vh] rounded-lg shadow-xl overflow-hidden">
                {loading && <SkeletonLoading />}

                <img
                  src={item.img}
                  alt=""
                  loading="lazy"
                  className="object-cover"
                  onLoad={() => setIsLoading(false)}
                />
              </div>
              <div className="flex items-center justify-between my-2">
                <p className="text-[18px] font-semibold text-black-600 mt-1">
                  {item.title}
                </p>
                <div>
                  <p>
                    <ScaleRoundedIcon className="text-green-600 " />{" "}
                    {item?.weight}
                  </p>
                </div>
              </div>

              <div className="text-[16px] font-semibold text-black-600 flex items-center justify-between gap-1 my-2">
                <p>
                  <CurrencyRupeeRoundedIcon className="text-green-600 " />{" "}
                  {item?.price}
                </p>
                <p>
                  <WhatshotRoundedIcon className="text-green-600 " />{" "}
                  {item?.calories}
                </p>
              </div>
              <p className="text-sm  text-black-200  line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
