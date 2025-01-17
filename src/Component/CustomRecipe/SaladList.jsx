import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { SkeletonLoading } from "../Common";
import { useSaladContext } from "../SaladContextApi/SaladContext";
export const SaladList = () => {
  const [showCard, setShowCard] = React.useState(true);
  const { state, dispatch } = useSaladContext();
  const [recipeName, setRecipeName] = useState("");
  const [loading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const hasData = state.createRecipe.some(
      (section) =>
        (section.base && section.base.length > 0) ||
        (section.toppings && section.toppings.length > 0) ||
        (section.dressing && section.dressing.length > 0) ||
        (section.vegetables && section.vegetables.length > 0) ||
        (section.extras && section.extras.length > 0)
    );
    setShowCard(hasData);
  }, [state.createRecipe]);

  useEffect(() => {
    setRecipeName(`Recipe${state.recipe.length}`);
  }, [state.recipe]);

  const hanldeRecipeName = (e) => {
    setRecipeName(e.target.value);
  };
  const handleRecipeCard = () => {
    setShowCard(false);
  };

  const handleSaveRecipe = () => {
    const updatedCreateRecipe = [...state.createRecipe];
    updatedCreateRecipe[5].recipeName = recipeName;

    dispatch({
      type: "SAVE_RECIPE",
      payload: { ...updatedCreateRecipe },
    });
  };

  return (
    <div
      className={`fixed top-auto bg-white-500 right-0   min-h-[10vh] w-[260px] shadow-lg  z-50  py-2 px-4  rounded-xl ${
        !showCard && "hidden"
      } `}
    >
      <div className="hl-toolbar-group relative">
        <div className="builder-form-name flex items-center justify-center text-black">
          <input
            type="text"
            value={recipeName}
            onChange={hanldeRecipeName}
            className="max-w-[60%] pl-1"
          />

          <svg
            data-v-0e8b4828=""
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="ml-1 h-3 w-3 text-gray-700 hover:text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.876 18.116c.046-.414.069-.62.131-.814a2 2 0 01.234-.485c.111-.17.259-.317.553-.61L17 3a2.828 2.828 0 114 4L7.794 20.206c-.294.294-.442.442-.611.553a2 2 0 01-.485.233c-.193.063-.4.086-.814.132L2.5 21.5l.376-3.384z"
            ></path>
          </svg>
        </div>
        <CancelIcon
          className=" absolute top-0 right-0 cursor-pointer"
          onClick={handleRecipeCard}
        />
      </div>
      <div className="grid grid-cols-3  gap-3 mt-4 max-h-[30vh] overflow-y-auto">
        {state?.createRecipe[0]?.base?.map((item, index) => (
          <div
            className=" shadow-lg px-1 cursor-pointer"
            key={index}
            onClick={() => dispatch({ type: "REMOVE_BASE", payload: item.id })}
          >
            <div className="w-auto h-12">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${item.img}`}
                alt=""
                className="object-cover rounded-md"
              />
            </div>
            <p className="flex justify-between gap-2 mt-1">
              <span className="text-[12px] text-black-200 line-clamp-1">
                {item.title}
              </span>
              <span className="text-[12px] text-black-300">{item.price}</span>
            </p>
          </div>
        ))}

        {state?.createRecipe[4]?.vegetables?.map((item, index) => (
          <div
            className="shadow-lg px-1  cursor-pointer"
            key={index}
            onClick={() =>
              dispatch({ type: "REMOVE_VEGETABLE", payload: item.id })
            }
          >
            <div className="w-auto h-12">
              {loading && <SkeletonLoading />}

              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${item.img}`}
                alt=""
                className="object-cover rounded-md"
                onLoad={() => setIsLoading(false)}
              />
            </div>
            <p className="flex justify-between gap-2 mt-1">
              <span className="text-[12px] text-black-200 line-clamp-1">
                {item.title}
              </span>
              <span className="text-[12px] text-black-300">{item.price}</span>
            </p>
          </div>
        ))}
        {state?.createRecipe[1]?.toppings?.map((item, index) => (
          <div
            className="shadow-lg px-1  cursor-pointer"
            key={index}
            onClick={() =>
              dispatch({ type: "REMOVE_TOPPING", payload: item.id })
            }
          >
            <div className="w-auto h-12">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${item.img}`}
                alt=""
                className="object-cover rounded-md"
              />
            </div>
            <p className="flex justify-between gap-2 mt-1">
              <span className="text-[12px] text-black-200 line-clamp-1">
                {item.title}
              </span>
              <span className="text-[12px] text-black-300">{item.price}</span>
            </p>
          </div>
        ))}
        {state?.createRecipe[2]?.dressing?.map((item, index) => (
          <div
            className="shadow-lg px-1  cursor-pointer"
            key={index}
            onClick={() =>
              dispatch({ type: "REMOVE_DRESSING", payload: item.id })
            }
          >
            <div className="w-auto h-12">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${item.img}`}
                alt=""
                className="object-cover rounded-md"
              />
            </div>
            <p className="flex justify-between gap-2 mt-1">
              <span className="text-[12px] text-black-200 line-clamp-1">
                {item.title}
              </span>
              <span className="text-[12px] text-black-300">{item.price}</span>
            </p>
          </div>
        ))}
        {state?.createRecipe[3]?.extra?.map((item, index) => (
          <div
            className="shadow-lg px-1  cursor-pointer"
            key={index}
            onClick={() => dispatch({ type: "REMOVE_EXTRA", payload: item.id })}
          >
            <div className="w-auto h-12">
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${item.img}`}
                alt=""
                className="object-cover rounded-md"
              />
            </div>
            <p className="flex justify-between gap-2 mt-1">
              <span className="text-[12px] text-black-200 line-clamp-1">
                {item.title}
              </span>
              <span className="text-[12px] text-black-300">{item.price}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 mb-2 flex gap-2  justify-between">
        {/* <button className="text-sm bg-red-500 py-2 text-center px-4 rounded-md text-white-500 " >
          Add To Cart
        </button> */}

        <button
          className="text-sm bg-green-600 py-2 text-center px-4 rounded-md text-white-500"
          onClick={handleSaveRecipe}
        >
          Save
        </button>
      </div>
    </div>
  );
};
