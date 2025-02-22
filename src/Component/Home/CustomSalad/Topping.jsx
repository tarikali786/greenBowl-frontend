import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import ToppingIocn from "../../../assets/icon/top.png";
import { Link } from "react-router-dom";
import {
  createRecipe,
  increaseWeightOfItem,
  removeItemFromRecipe,
} from "../../../features/saladSlice";
import { useDispatch, useSelector } from "react-redux";
import ImageComponent from "../../Common/ImageComponent";
export const Topping = () => {
  const dispatch = useDispatch();
  const toppingData = useSelector((state) => state.salad.topping);
  const topping = useSelector((state) => state.salad.createRecipe[1].topping);

  const handletToppingDataSelection = (id) => {
    if (topping.find((i) => i.id === id)) {
      dispatch(removeItemFromRecipe({ type: "topping", id: id }));
    } else {
      const data = toppingData.find((i) => i.id === id);
      if (data) {
        dispatch(createRecipe({ type: "topping", data: data }));
      }
    }
  };

  const handleWeight = (e, id) => {
    e.stopPropagation();
    dispatch(
      increaseWeightOfItem({ typeKey: "topping", id: id, weightChange: 250 })
    );
  };

  return (
    <div className="my-8">
      <div className="flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-2xl font-semibold text-black-600">
          {" "}
          <div className="size-10">
            <img src={ToppingIocn} alt="" />
          </div>{" "}
          Topping
        </h3>
        <Link
          to="/recepi/topping"
          className="text-lg bg-red-500 text-white-500 px-3 py-[6px] rounded-xl"
        >
          More
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 mm:grid-cols-2 gap-6 ">
        {toppingData.slice(0, 4)?.map((item) => (
          <div className="mt-8" key={item.id}>
            <div
              className={`rounded-lg shadow-lg p-4 ${
                topping.some((i) => i.id === item.id)
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
                    topping.some((i) => i.id === item.id)
                      ? "bg-red-500 "
                      : "bg-green-500 "
                  }`}
                  onClick={() => handletToppingDataSelection(item.id)}
                >
                  {topping.some((i) => i.id === item.id) ? "Remove" : "Add"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
