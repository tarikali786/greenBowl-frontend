import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SkeletonLoading } from "../../Common";
import { useDispatch, useSelector } from "react-redux";
import {
  createRecipe,
  increaseWeightOfItem,
  removeItemFromRecipe,
} from "../../../features/saladSlice";
export const Extra = () => {
  const [loading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const extraData = useSelector((state) => state.salad.extra);
  const extra = useSelector((state) => state.salad.createRecipe[3].extra);


  const handleExtraSelection = (id) => {
    if (extra.find((item) => item.id === id)) {
      dispatch(
        removeItemFromRecipe({
          type: "extra",
          id: id,
        })
      );
    } else {
      const data = extraData.find((i) => i.id === id);
      if (data) {
        dispatch(createRecipe({ type: "extra", data: data }));
      }
    }
  };
  const handleWeight = (e, id) => {
    e.stopPropagation();
    dispatch(
      increaseWeightOfItem({ typeKey: "extra", id: id, weightChange: 250 })
    );
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
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 mm:grid-cols-2 gap-6  ">
        {extraData.slice(0, 4).map((item) => (
          <div className="mt-8" key={item.id}>
            <div
              className={`rounded-lg shadow-lg p-4 ${
                extra.some((i) => i.id === item.id)
                  ? "border-4 border-green-500"
                  : ""
              }`}
            >
              <div className="w-full h-[22vh] md:h-[22vh] lg:h-[24vh] xl:h-[26vh] rounded-lg shadow-xl overflow-hidden">
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
                <div className="flex items-center gap-2">
                  <ScaleRoundedIcon className="text-green-600" />
                  <div className="bg-white-400 rounded-md flex items-center overflow-hidden">
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      className="outline-none px-1 pl-2"
                    >
                      {item.weight}g
                    </p>
                    <button
                      onClick={(e) => handleWeight(e, item.id)}
                      disabled={item.weight <= 250}
                      className="px-3 py-1 bg-red-500 text-white-500 font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-[16px] font-semibold text-black-600 flex items-center justify-between gap-1 my-2">
                <p>
                  <WhatshotRoundedIcon className="text-green-600" />{" "}
                  {item?.calories} kcal per 100g
                </p>
              </div>
              <p className="text-sm text-black-200 line-clamp-2">
                {item.description}
              </p>
              <div className="flex justify-between mt-2 items-center">
                <p>
                  <CurrencyRupeeRoundedIcon className="text-green-600" />{" "}
                  {item?.price}
                </p>
                <button
                  className={`px-5 py-1 text-white-500 rounded-md ${
                    extra.some((i) => i.id === item.id)
                      ? "bg-red-500 "
                      : "bg-green-500 "
                  }`}
                  onClick={() => handleExtraSelection(item.id)}
                >
                  {extra.some((i) => i.id === item.id) ? "Remove" : "Add"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
