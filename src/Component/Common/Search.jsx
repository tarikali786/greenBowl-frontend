import  { useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSaladContext } from "../SaladContextApi/SaladContext";
import { ExploreSaladData, PopularSaladData } from "../Data/data";
import { Link } from "react-router-dom";

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [itemListShow, setItemListShow] = useState(false);
  const { state } = useSaladContext();
  const handleOnchange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredSalad = useMemo(() => {
    if (!searchValue.trim()) {
      return null;
    }
    const allSalads = [...ExploreSaladData, ...PopularSaladData];
    const lowercasedSearch = searchValue?.toLowerCase();
    return allSalads
      .filter((salad) => salad?.title?.toLowerCase().includes(lowercasedSearch))
      .slice(0, 6);
  }, [state, searchValue]);

  return (
    <div
      className="w-[40%]  px-2 py-3 bg-white-500 md:flex items-center rounded-lg  hover:rounded-b-none  hidden relative "
      onMouseEnter={() => setItemListShow(true)}
      onMouseLeave={() => setItemListShow(false)}
    >
      <SearchIcon />
      <input
        type="text"
        placeholder="Search your favorite Salads and More"
        className="outline-none border-none w-full bg-white-500 px-2 active:rounded-none"
        onChange={handleOnchange}
      />
      {itemListShow && (
        <div className=" absolute top-[49px]  bg-white-500 max-h-[40vh] w-full left-0  rounded-b-lg  pt-2 shadow-lg ">
          <span className="text-black-300  text-sm px-3 ">Discover More</span>
          {recipeList == "" &&
            filteredSalad?.map((i, index) => (
              <Link
                to={`searchData/${i.id}`}
                key={index}
                className="py-2 px-3 cursor-pointer hover:bg-[#daecd5] flex  items-center"
              >
                <SearchIcon className="text-black-300" />
                <p className="text-black-400">{i?.title}</p>
              </Link>
            ))}
          {recipeList &&
            recipeList?.map((i, index) => (
              <div
                key={index}
                className="py-2 px-3 cursor-pointer hover:bg-[#daecd5] flex  items-center"
              >
                <SearchIcon className="text-black-300" />
                <p className="text-black-400">Greek Freshness</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
