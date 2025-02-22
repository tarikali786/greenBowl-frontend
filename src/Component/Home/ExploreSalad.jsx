import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ImageComponent from "../Common/ImageComponent";

export const ExploreSalad = () => {
  const { exploreData } = useSelector((state) => state.salad);

  return (
    <div className="px-4 md:px-14 lg:px-32 xl:px-44 py-6 bg-white-500 ">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">
          Explore Our Most Loved Salads
        </h1>
        <Link
          to="/exploreSalad"
          className="text-lg bg-red-500 text-white-500 px-3 py-[6px] rounded-xl"
        >
          More
        </Link>
      </div>

      <div className="my-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {exploreData?.slice(0, 6)?.map((item) => (
          <div className="country-Card" key={item.id}>
            <Link
              to={`/exploreSalad/${item.uid}`}
              className="flex flex-col items-center justify-center gap-2"
            >
              <ImageComponent
                variant="circular"
                src={item.image}
                imgCss="object-cover transition-transform duration-500 ease-in-out hover:scale-150"
                cardCss="size-24 sm:size-28 md:size-36 overflow-hidden  border-4 border-red-500 rounded-full"
              />

              <p className="text-[16px]  text-black-600 mt-1">{item?.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
