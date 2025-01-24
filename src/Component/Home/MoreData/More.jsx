import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import FilterNoneRoundedIcon from "@mui/icons-material/FilterNoneRounded";
import { useSaladContext } from "../../SaladContextApi/SaladContext";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SkeletonLoading } from "../../Common";

export const More = () => {
  const { state, dispatch } = useSaladContext();
  const [loading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const { salad } = useParams();
  const dynamicSalad = state[salad];

  useEffect(() => {
    if (salad == "base") {
      setCount(0);
    } else if (salad == "topping") {
      setCount(1);
    } else if (salad == "dressing") {
      setCount(2);
    } else if (salad == "extra") {
      setCount(3);
    } else if (salad == "vegetable") {
      setCount(4);
    }
  }, [salad]);
  const dynamicCreateRecipe = state.createRecipe[count][salad];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleBaseSelection = (id) => {
    if (dynamicCreateRecipe.find((i) => i.id === id)) {
      dispatch({ type: "REMOVE_BASE", payload: id });
    } else {
      const Objectdata = dynamicSalad.find((i) => i.id === id);
      if (Objectdata) {
        dispatch({
          type: "CREATE_RECIPE",
          payload: { data: Objectdata, type: salad.toUpperCase() },
        });
      }
    }
  };

  return (
    <div className="px-4 md:px-14 lg:px-24 xl:px-44 my-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-black-600">
          {salad.toUpperCase()}
        </h3>
      </div>
      <div className="grid lg:grid-cols-4 mm:grid-cols-2 gap-6 ">
        {dynamicSalad?.map((item) => (
          <div className="mt-8" key={item.id}>
            <div
              className={`cursor-pointer rounded-lg shadow-lg  p-4 ${
                dynamicCreateRecipe?.some((i) => i.id === item.id)
                  ? "border-4 border-green-500"
                  : ""
              }`}
              key={item.id}
              onClick={() => handleBaseSelection(item.id)}
            >
              <div className="w-full  h-[22vh]  md:h-[22vh] lg:h-[24vh] xl:h-[26vh] rounded-lg shadow-xl overflow-hidden">
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
