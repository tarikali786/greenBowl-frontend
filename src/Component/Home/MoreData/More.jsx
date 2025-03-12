import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";

import { useDispatch, useSelector } from "react-redux";
import {
  createRecipe,
  decreaseWeightOfItem,
  increaseWeightOfItem,
  removeItemFromRecipe,
} from "../../../features/saladSlice";
import ImageComponent from "../../Common/ImageComponent";
export const More = () => {
  const dispatch = useDispatch();
  const { salad } = useParams();
  const moreData = useSelector((state) => state.salad[salad]);
  const dynamicCreateRecipe = useSelector((state) => state.salad.createRecipe);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleItemSelection = (uid) => {
    if (dynamicCreateRecipe.find((i) => i.uid === uid)) {
      dispatch(removeItemFromRecipe({ uid: uid }));
    } else {
      const Objectdata = moreData.find((i) => i.uid === uid);
      if (Objectdata) {
        dispatch(createRecipe({ data: Objectdata }));
      }
    }
  };

  const handleWeight = (e, uid, price) => {
    e.stopPropagation();
    dispatch(
      increaseWeightOfItem({
        typeKey: salad,
        uid: uid,
        weightChange: 250,
        price: price,
      })
    );
  };

  const handleDecreaseWeight = (e, uid, price) => {
    e.stopPropagation();

    dispatch(
      decreaseWeightOfItem({
        typeKey: salad,
        uid: uid,
        weightChange: 250,
        price: price,
      })
    );
  };

  return (
    <div className="px-4 md:px-14 lg:px-24 xl:px-44 my-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-black-600">
          {salad.toUpperCase()}
        </h3>
      </div>
      <div className="grid lg:grid-cols-3 mm:grid-cols-2 gap-6 ">
        {moreData?.map((item) => (
          <div className="mt-8" key={item.uid}>
            <div
              className={`cursor-pointer rounded-lg shadow-lg  p-4 ${
                dynamicCreateRecipe?.some((i) => i.uid === item.uid)
                  ? "border-4 border-green-500"
                  : ""
              }`}
            >
              <ImageComponent
                src={item.image}
                cardCss="w-full h-[22vh] md:h-[22vh] lg:h-[24vh] xl:h-[26vh] rounded-lg shadow-xl overflow-hidden"
                imgCss="object-cover"
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
                      {parseInt(item.weight)}g
                    </p>

                    {!dynamicCreateRecipe.some((i) => i.uid === item.uid) && (
                      <>
                        <button
                          onClick={(e) =>
                            handleWeight(
                              e,
                              item.uid,
                              Math.round(item.price / 2)
                            )
                          }
                          className="px-3 py-1 bg-green-500 text-white-500 font-bold text-xl cursor-pointer"
                        >
                          +
                        </button>
                        {parseInt(item.weight) > 500 && (
                          <button
                            onClick={(e) =>
                              handleDecreaseWeight(
                                e,
                                item.uid,
                                Math.round(item.price / 2)
                              )
                            }
                            className="px-2 py-1  bg-red-500 text-white-500 font-bold text-xl cursor-pointer"
                          >
                            <RemoveIcon
                              style={{ fontSize: "24px", width: "16px" }}
                            />
                          </button>
                        )}
                      </>
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
                  {parseInt(item?.updatedPrice ?? item.price)}
                </p>
                <button
                  className={`px-5 py-1 text-white-500 rounded-md ${
                    dynamicCreateRecipe?.some((i) => i.uid === item.uid)
                      ? "bg-red-500 "
                      : "bg-green-500 "
                  }`}
                  onClick={() => handleItemSelection(item.uid)}
                >
                  {dynamicCreateRecipe?.some((i) => i.uid === item.uid)
                    ? "Remove"
                    : "Add"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
