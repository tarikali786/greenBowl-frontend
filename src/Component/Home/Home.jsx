import { useEffect } from "react";
import { Hero } from "./Hero";
import { PopuralSalad } from "./PopuralSalad";
import { ExploreSalad } from "./ExploreSalad";
import { CustomSalad } from "./CustomSalad/CustomSalad";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomePageData } from "../../features/saladSlice";
import { SkeletonLoading } from "../Common";

export const Home = () => {
  const dispatch = useDispatch();

  const { loading, exploreData, popularData } = useSelector(
    (state) => state.salad
  );

  
  useEffect(() => {
    if (exploreData.length === 0 || popularData.length === 0) {
      dispatch(fetchHomePageData());
    }
  }, [dispatch, exploreData, popularData]);

  return (
    <>
      <Hero />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-14 lg:px-24 xl:px-44 my-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="w-full h-[30vh] bg-white-500 rounded-xl">
              <SkeletonLoading />
            </div>
          ))}
        </div>
      ) : (
        <>
          <ExploreSalad />
          <PopuralSalad />
          <CustomSalad />
        </>
      )}
    </>
  );
};
