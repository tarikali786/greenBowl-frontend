import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import { useSaladContext } from "../../SaladContextApi/SaladContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SkeletonLoading } from "../../Common";
import { ExploreSaladData } from "../../Data/data";
import StarsIcon from "@mui/icons-material/Stars";
export const ExploreDetail = () => {
  const { dispatch } = useSaladContext();
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const filterData = ExploreSaladData?.filter((item) => item.id == id);
    setDetails(filterData[0]);
  }, [id]);


  const handleAddData = () => {
    if (details) {
      dispatch({
        type: "ADDCART",
        payload: details,
      });
    }
  };


  

  return (
    <div className="px-4 md:px-14 lg:px-24 xl:px-44 my-8">
      <div className="w-full md:h-[50vh] h-[40vh] overflow-hidden rounded-xl">
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}/${details.img}`}
          alt=""
          className=" object-cover rounded-lg  "
        />
      </div>
      <div className="flex justify-between  items-center gap-5 mt-6">
        <h3 className="text-2xl mt-4 font-semibold text-black-600">
          {details?.title}
        </h3>

        <div onClick={handleAddData} className="text-lg bg-red-500 text-white-500 px-3 py-[8px] cursor-pointer hover:bg-green-500  rounded-xl">
          Order Now
        </div>
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
