import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import FilterNoneRoundedIcon from "@mui/icons-material/FilterNoneRounded";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createRecipe,
  decreaseWeightOfItem,
  increaseWeightOfItem,
  removeItemFromRecipe,
} from "../../../features/saladSlice";
import ImageComponent from "../../Common/ImageComponent";
import RemoveIcon from "@mui/icons-material/Remove";
export const Base = () => {
  const dispatch = useDispatch();
  const baseData = useSelector((state) => state.salad.base);
  const base = useSelector((state) => state.salad.createRecipe);

  const handleBaseSelection = (uid) => {
    const isItemInRecipe = base.some((item) => item.uid === uid);
    if (isItemInRecipe) {
      dispatch(removeItemFromRecipe({ uid: uid }));
    } else {
      const Objectdata = baseData.find((i) => i.uid === uid);

      if (Objectdata) {
        dispatch(createRecipe({ data: Objectdata }));
      }
    }
  };

  const handleWeight = (e, uid) => {
    e.stopPropagation();
    dispatch(
      increaseWeightOfItem({ typeKey: "base", uid: uid, weightChange: 250 })
    );
  };

  const handleDecreaseWeight = (e, uid) => {
    e.stopPropagation();
    dispatch(
      decreaseWeightOfItem({ typeKey: "base", uid: uid, weightChange: 250 })
    );
  };

  return (
    <div className="my-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-black-600">
          <FilterNoneRoundedIcon className="text-green-500" /> Base
        </h3>
        <Link
          to="/recepi/base"
          className="text-lg bg-red-500 text-white-500 px-3 py-[6px] rounded-xl"
        >
          More
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 xl:grid-cols-3 mm:grid-cols-2 gap-6">
        {baseData.slice(0, 3).map((item) => (
          <div className="mt-8" key={item.uid}>
            <div
              className={`rounded-lg shadow-lg p-4 ${
                base.some((i) => i.id == item.id)
                  ? "border-4 border-green-500"
                  : ""
              }`}
            >
              <ImageComponent
                variant="rounded"
                src={item.image}
                imgCss="object-cover "
                cardCss="w-full h-[22vh] md:h-[22vh] lg:h-[24vh] xl:h-[26vh] rounded-lg shadow-xl overflow-hidden"
              />

              <div className="flex items-center justify-between my-2">
                <p className="text-[18px] font-semibold text-black-600 mt-1">
                  {item.name}
                </p>
                <div className="flex items-center gap-2">
                  <ScaleRoundedIcon className="text-green-600" />
                  <div className="bg-white-400 rounded-md flex items-center overflow-hidden">
                    <p
                      suppressContentEditableWarning
                      className="outline-none px-1 pl-2"
                    >
                      {parseInt(item.weight)}g
                    </p>
                    <button
                      onClick={(e) => handleWeight(e, item.uid)}
                      className="px-3 py-1 bg-green-500 text-white-500 font-bold text-xl cursor-pointer"
                    >
                      +
                    </button>
                    {parseInt(item.weight) >= 250 && (
                      <button
                        onClick={(e) => handleDecreaseWeight(e, item.uid)}
                        className="px-2 py-1  bg-red-500 text-white-500 font-bold text-xl cursor-pointer"
                      >
                        <RemoveIcon
                          style={{ fontSize: "24px", width: "16px" }}
                        />
                      </button>
                    )}
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
                    base.some((i) => i.uid === item.uid)
                      ? "bg-red-500 "
                      : "bg-green-500 "
                  }`}
                  onClick={() => handleBaseSelection(item.uid)}
                >
                  {base.some((i) => i.uid === item.uid) ? "Remove" : "Add"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
