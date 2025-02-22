import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addRecipeTocart,
  removeRecipeFromList,
} from "../../features/saladSlice";
import ImageComponent from "../Common/ImageComponent";
export const Recipe = () => {
  const dispatch = useDispatch();
  const recipeList = useSelector((state) => state.salad.recipe);
  const cartList = useSelector((state) => state.salad.cart);

  console.log(recipeList);

  // Function to calculate the total price of a recipe
  const calculateTotalPrice = (recipe) => {
    const categories = ["base", "topping", "dressing", "extra", "vegetable"];
    return categories.reduce((total, category, index) => {
      if (recipe[index]?.[category]?.length > 0) {
        total += recipe[index][category].reduce(
          (sum, item) => sum + Number(item.price || 0),
          0
        );
      }
      return total;
    }, 0);
  };

  // Function to calculate the total calories of a recipe
  const calculateTotalCalories = (recipe) => {
    const categories = ["base", "topping", "dressing", "extra", "vegetable"];
    return categories.reduce((total, category, index) => {
      if (recipe[index]?.[category]?.length > 0) {
        total += recipe[index][category].reduce(
          (sum, item) => sum + Number(item.calories?.split(" ")[0] || 0),
          0
        );
      }
      return total;
    }, 0);
  };

  const handleRemoveRecipe = (id) => {
    dispatch(removeRecipeFromList(id));
  };

  const handleAddToCartRecipe = (id) => {
    const checkData = cartList.filter((item) => item.id === id);

    if (checkData.length === 0) {
      const data = recipeList.find((item) => item.id === id);
      dispatch(addRecipeTocart(data));
    }
  };

  return (
    <div className="px-4 md:px-14 lg:px-32 xl:px-44 py-6 flex flex-col gap-y-4">
      {recipeList.length === 0 && (
        <div className="flex flex-col gap-10 my-20">
          <p className="text-center text-gray-500 text-lg mt-6">
            No recipes available yet! Start creating your first delicious salad
            recipe now.
          </p>
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
            {["base", "topping", "dressing", "extra", "vegetable"].map(
              (category, index) =>
                recipe[index]?.[category]?.length > 0 &&
                recipe[index]?.[category].map((item) => (
                  <ImageComponent
                    key={item.uid}
                    src={item.image}
                    cardCss="h-16 shadow-lg"
                  />
                ))
            )}
          </div>

          <div>
            <h1 className="text-lg font-semibold text-black-600">
              {recipe?.recipeName}
            </h1>

            <div className="flex gap-1 flex-wrap">
              {["base", "topping", "dressing", "extra", "vegetable"].map(
                (category, categoryIndex) =>
                  recipe[categoryIndex]?.[category]?.length > 0 &&
                  recipe[categoryIndex]?.[category].map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex flex-wrap gap-1 font-semibold"
                    >
                      {item.name}
                      {recipe[categoryIndex]?.[category]?.length > 1 && ","}
                    </div>
                  ))
              )}
            </div>

            <p className="text-black-600">
              Total Price: <strong>{calculateTotalPrice(recipe)}</strong>
            </p>
            <p className="text-black-600">
              Total Calories:{" "}
              <strong>{calculateTotalCalories(recipe)} kcal</strong>
            </p>
            <div className="flex gap-6 mt-5">
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

              <button
                className="text-sm bg-red-600 py-2 text-center px-4 rounded-md text-white-500"
                onClick={() => handleRemoveRecipe(recipe.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
