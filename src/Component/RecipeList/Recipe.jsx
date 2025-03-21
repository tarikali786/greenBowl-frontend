import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addRecipeTocart,
  deleteUserRecipeList,
  editRecipeItem,
  fetchUserRecipeList,
} from "../../features/saladSlice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ImageComponent from "../Common/ImageComponent";
import { useEffect, useState } from "react";
export const Recipe = () => {
  const dispatch = useDispatch();
  const recipeList = useSelector((state) => state.salad.recipe);
  const cartList = useSelector((state) => state.salad.cart);
  const { loading, loadingRecipe } = useSelector((state) => state.salad);
  const [deleteUid, setDeleteUid] = useState("");

  const { createRecipe } = useSelector((state) => state.salad);
  console.log(createRecipe);

  useEffect(() => {
    if (recipeList.length == 0) {
      dispatch(fetchUserRecipeList());
    }
  }, []);

  const handleRemoveRecipe = (uid) => {
    setDeleteUid(uid);
    dispatch(deleteUserRecipeList(uid));
  };

  const handleAddToCartRecipe = (id) => {
    const checkData = cartList.filter((item) => item.id === id);

    if (checkData.length === 0) {
      const data = recipeList.find((item) => item.id === id);
      dispatch(addRecipeTocart(data));
    }
  };

  if (loading)
    return (
      <p className=" px-4 md:px-14 lg:px-32 xl:px-44 py-6  text-center text-gray-500 text-lg mt-6">
        Loading...
      </p>
    );

  const handleEditRecipe = (uid) => {
    dispatch(editRecipeItem(uid));
  };

  return (
    <div className="px-4 md:px-14 lg:px-32 xl:px-44 py-6 flex flex-col gap-y-4">
      {recipeList.length === 0 && (
        <div className="flex flex-col gap-10 my-20">
          <div className=" m-auto">
            <Link
              to="/"
              className="px-6 py-3 bg-green-500 text-white-500 rounded-md"
            >
              Create Your First Salad
            </Link>
          </div>
        </div>
      )}

      {recipeList.map((recipe) => (
        <div
          className="flex  flex-wrap sm:flex-nowrap gap-8 border-b border-white-200 pb-4"
          key={recipe?.uid}
        >
          <div className="w-60 h-40 border flex flex-wrap justify-start overflow-y-auto rounded">
            {recipe?.ingredients?.map((item, index) => (
              <ImageComponent
                key={recipe?.uid + index}
                src={item?.ingredient?.image}
                cardCss="h-16 shadow-lg"
              />
            ))}
          </div>

          <div>
            <h1 className="text-lg font-semibold text-black-600">
              {recipe?.name}
            </h1>

            <div className="flex gap-1 flex-wrap">
              {recipe?.ingredients?.map((item, itemIndex) => (
                <div
                  key={item.ingredient.uid + itemIndex}
                  className="flex flex-wrap gap-1 font-semibold"
                >
                  {item?.ingredient?.name},
                </div>
              ))}
            </div>

            <p className="text-black-600">Total Price: {recipe?.total_price}</p>
            <p className="text-black-600">
              Total Calories: {recipe?.total_calories}Kcal
            </p>

            <div className="flex gap-4 mt-3  items-center ">
              <button
                className={`text-sm py-2 text-white-500 text-center px-4 rounded-md ${
                  cartList.some((item) => item.id === recipe.id)
                    ? "bg-red-500 cursor-not-allowed"
                    : "bg-green-500"
                }`}
                onClick={() => handleAddToCartRecipe(recipe.id)}
                disabled={cartList.some((item) => item.id === recipe.id)}
              >
                {cartList.some((item) => item.uid === recipe.uid)
                  ? "Added"
                  : "Add To Cart"}
              </button>

              <DeleteForeverIcon
                className="text-sm bg-red-600 p-1 rounded-md cursor-pointer hover:bg-red-500  "
                style={{ color: "#fff", height: "34px", width: "30px" }}
                onClick={() => handleRemoveRecipe(recipe.uid)}
              />

              <Link to={`/edit-recipe/${recipe.uid}`}>
                <ModeEditOutlineIcon
                  className="text-sm bg-green-500 p-1 rounded-md cursor-pointer hover:bg-green-600  "
                  style={{ color: "#fff", height: "34px", width: "30px" }}
                />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
