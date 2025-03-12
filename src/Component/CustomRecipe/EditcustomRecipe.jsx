import { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromRecipe,
  saveRecipeItem,
} from "../../features/saladSlice";
import ImageComponent from "../Common/ImageComponent";
import { toast } from "react-toastify";
export const EditCustomRecipeCard = () => {
  const [showCard, setShowCard] = useState(true);
  const dispatch = useDispatch();
  const EditCustomRecipe = useSelector(
    (state) => state?.salad?.EditCustomRecipe
  );

  const [recipeName, setRecipeName] = useState("");
  const { loadingRecipe } = useSelector((state) => state.salad);
  useEffect(() => {
    setRecipeName(EditCustomRecipe?.name);
  }, [EditCustomRecipe]);

  const handleSaveRecipe = () => {
    const data = {
      name: recipeName,
      total_price: parseFloat(
        EditCustomRecipe?.reduce((sum, item) => sum + parseFloat(item.price), 0)
      ).toFixed(2),
      total_calories: parseFloat(
        EditCustomRecipe?.reduce(
          (sum, item) => sum + parseFloat(item.calories),
          0
        )
      ).toFixed(0),
      ingredients:
        EditCustomRecipe?.map((item) => ({
          ingredient_id: item.uid,
          weight: parseFloat(item?.weight).toFixed(3),
          price: parseFloat(item?.updatedPrice ?? item.price).toFixed(2),
          calories: parseFloat(item?.updatedCalories ?? item.calories).toFixed(
            0
          ),
        })) || [],
    };

    dispatch(saveRecipeItem(data))
      .unwrap()
      .then((res) => {
        toast.success("Added ");
      })
      .catch((error) => {
        toast.error("Something went wrong please try again");
        console.log(error);
      });
  };

  const handleRemoveItem = (uid) => {
    dispatch(removeItemFromRecipe({ uid: uid }));
  };

  return (
    showCard && (
      <div className="fixed top-auto bg-white-500 right-0 min-h-[10vh] w-[260px] shadow-lg z-50 py-2 px-4 rounded-xl">
        <div className="hl-toolbar-group relative">
          <div className="builder-form-name flex items-center justify-center text-black">
            <input
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.name)}
              className="max-w-[60%] pl-1"
            />
            <CancelIcon
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => setShowCard(false)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4 max-h-[30vh] overflow-y-auto">
          {EditCustomRecipe?.ingredients?.map((item, index) => (
            <div
              key={index}
              className="shadow-lg px-1 cursor-pointer"
              onClick={() => handleRemoveItem(item.uid)}
            >
              <ImageComponent
                src={item?.ingredient?.image}
                cardCss="w-auto h-12"
                imgCss="object-cover rounded-md"
              />
              <p className="flex justify-between gap-2 mt-1">
                <span className="text-[12px]  text-black-200 line-clamp-1">
                  {item?.ingredient?.name}
                </span>
                <span className="text-[12px] text-black-300">
                  {item?.ingredient?.updatedPrice ?? item?.ingredient?.price}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 mb-2 flex gap-2 justify-between">
          <button
            className="text-sm bg-green-600 py-2 text-center px-4 rounded-md text-white-500"
            onClick={handleSaveRecipe}
          >
            {loadingRecipe ? "..." : "Save"}
          </button>
        </div>
      </div>
    )
  );
};
