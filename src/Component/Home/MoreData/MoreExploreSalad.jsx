import { Link } from "react-router-dom";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import { useSelector } from "react-redux";
import ImageComponent from "../../Common/ImageComponent";
export const MoreExploreSalad = () => {
  const exploreSaladData = useSelector((state) => state.salad.exploreData);
  return (
    <div className="px-4 md:px-14 lg:px-34 xl:px-44 py-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">
          Explore Our Most Loved Salads
        </h1>
      </div>
      <div className="my-8 grid mm:grid-cols-2 lg:grid-cols-3  gap-8 ">
        {exploreSaladData?.map((item) => (
          <div className="country-Card" key={item.uid}>
            <Link
              to={`/exploreSalad/${item?.uid}`}
              className="flex flex-col items-left justify-left gap-2"
            >
              <ImageComponent
                src={item.image}
                cardCss=" w-full h-[22vh]  md:h-[26vh] lg:h-[28vh] xl:h-[32vh] rounded-lg shadow-xl overflow-hidden"
                imgCss="object-cover transition-transform duration-500 ease-in-out hover:scale-150"
              />

              <p className="text-[18px] font-semibold text-black-600 mt-1">
                {item.name}
              </p>
              <p className="text-[16px] font-semibold text-black-600 flex items-center gap-1">
                <StarsRoundedIcon className="text-green-600 " />{" "}
                {item?.rating || 4.7}{" "}
                <WhatshotRoundedIcon className="text-green-600 ml-2" />{" "}
                {item?.calories}
              </p>
              <p className="text-sm  text-black-400 flex flex-wrap gap-1  ">
                {item?.ingredients?.map((ing, index) => (
                  <p className="font-semibold" key={index}>
                    {ing?.name},
                  </p>
                ))}
              </p>
              <p className="text-sm  text-black-200  ">{item.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
