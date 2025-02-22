import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromRecipe, saveRecipe } from "../../features/saladSlice";
import ImageComponent from "../Common/ImageComponent";
export const SaladList = () => {
  const [showCard, setShowCard] = useState(true);
  const dispatch = useDispatch();
  const createRecipeData = useSelector((state) => state?.salad?.createRecipe);
  const recipeCount = useSelector((state) => state.salad.recipe);
  const [recipeName, setRecipeName] = useState("");

  useEffect(() => {
    const hasData = createRecipeData.some((section) =>
      Object.values(section).some(
        (items) => Array.isArray(items) && items.length > 0
      )
    );
    setShowCard(hasData);
    setRecipeName(`Recipe${recipeCount.length}`);
  }, [createRecipeData, recipeCount]);

  const handleSaveRecipe = () => {
    dispatch(saveRecipe({ recipeName: recipeName, data: createRecipeData }));
  };

  const handleRemoveItem = (type, id) => {
    dispatch(
      removeItemFromRecipe({
        type: type,
        id: id,
      })
    );
  };

  const renderItems = (type, items) => {
    if (!Array.isArray(items)) return null;
    return items.map((item, index) => (
      <div
        key={index}
        className="shadow-lg px-1 cursor-pointer"
        onClick={() => handleRemoveItem(type.toUpperCase(), item.id)}
      >
        <ImageComponent
          src={item.image}
          cardCss="w-auto h-12"
          imgCss="object-cover rounded-md"
        />
        <p className="flex justify-between gap-2 mt-1">
          <span className="text-[12px]  text-black-200 line-clamp-1">
            {item.name}
          </span>
          <span className="text-[12px] text-black-300">{item.price}</span>
        </p>
      </div>
    ));
  };

  return (
    showCard && (
      <div className="fixed top-auto bg-white-500 right-0 min-h-[10vh] w-[260px] shadow-lg z-50 py-2 px-4 rounded-xl">
        <div className="hl-toolbar-group relative">
          <div className="builder-form-name flex items-center justify-center text-black">
            <input
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className="max-w-[60%] pl-1"
            />
            <CancelIcon
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => setShowCard(false)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4 max-h-[30vh] overflow-y-auto">
          {createRecipeData.map((section) => {
            const [type, items] = Object.entries(section)[0];
            return renderItems(type, items);
          })}
        </div>

        <div className="mt-3 mb-2 flex gap-2 justify-between">
          <button
            className="text-sm bg-green-600 py-2 text-center px-4 rounded-md text-white-500"
            onClick={handleSaveRecipe}
          >
            Save
          </button>
        </div>
      </div>
    )
  );
};
