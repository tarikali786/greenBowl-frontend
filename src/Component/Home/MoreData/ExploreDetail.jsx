import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StarsIcon from "@mui/icons-material/Stars";
import { useSelector, useDispatch } from "react-redux";
import {
  addRecipeTocart,
  removeRecipeFromCart,
} from "../../../features/saladSlice";
import ImageComponent from "../../Common/ImageComponent";
export const ExploreDetail = () => {
  const dispatch = useDispatch();
  const exploreData = useSelector((state) => state?.salad?.exploreData);
  const cartData = useSelector((state) => state?.salad?.cart);

  const { id } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const filterData = exploreData?.filter((item) => item.uid == id);
    setDetails(filterData[0]);
  }, [id]);

  const handleAddData = () => {
    if (details) {
      const isItemInCart = cartData.find((item) => item.id === details.id);
      if (isItemInCart) {
        dispatch(removeRecipeFromCart(details.id));
      } else {
        dispatch(addRecipeTocart(details));
      }
    }
  };

  return (
    <div className="px-4 md:px-14 lg:px-24 xl:px-44 my-8">
      <ImageComponent
        src={details?.image}
        cardCss="w-full md:h-[50vh] h-[40vh] overflow-hidden rounded-xl"
        imgCss=" object-cover rounded-lg  "
      />
      <div className="flex justify-between  items-center gap-5 mt-6">
        <h3 className="text-2xl mt-4 font-semibold text-black-600">
          {details?.name}
        </h3>
        {cartData.find((item) => item.id === details.id) ? (
          <div
            onClick={handleAddData}
            className="text-lg bg-red-500 text-white-500 px-3 py-[8px] cursor-pointer hover:bg-green-500  rounded-xl"
          >
            Remove
          </div>
        ) : (
          <div
            onClick={handleAddData}
            className="text-lg bg-red-500 text-white-500 px-3 py-[8px] cursor-pointer hover:bg-green-500  rounded-xl"
          >
            Order Now
          </div>
        )}
      </div>

      <p>
        {details?.description ||
          "A yogurt-based salad with fresh vegetables and mustard seeds."}
      </p>
      <div className="flex gap-1 mt-2">
        {Array.from(
          { length: Math.ceil(details?.rating || 4.6) },
          (_, index) => (
            <StarsIcon key={index} className="text-red-600" />
          )
        )}
        <b>( {details?.rating || 4.6} )</b>
      </div>
      <div className="flex gap-10 my-2">
        <p>
          price: <b>₹ {details?.price || 220}</b>
        </p>
        <p>
          Calories: <b>{details?.calories}</b>
        </p>
      </div>

      <h1 className="text-xl mt-5 font-semibold  text-green-500">
        Ingredients
      </h1>
      <div className="grid lg:grid-cols-4 mm:grid-cols-2 gap-6 ">
        {details?.ingredients?.map((item) => (
          <div className="mt-4" key={item.id}>
            <div className={` rounded-lg shadow-lg  p-4 `} key={item.id}>
              <ImageComponent
                src={item.image}
                cardCss="w-full  h-[22vh]  md:h-[22vh] lg:h-[24vh] xl:h-[26vh] rounded-lg shadow-xl overflow-hidden"
                imgCss="object-cover"
              />
              <div className="flex items-center justify-between my-2">
                <p className="text-[18px] font-semibold text-black-600 mt-1">
                  {item.name}
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
