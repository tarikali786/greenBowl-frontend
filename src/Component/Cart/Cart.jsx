import { useSaladContext } from "../SaladContextApi/SaladContext";
import { Link } from "react-router-dom";
export const Cart = () => {
  const { state, dispatch } = useSaladContext();

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
    dispatch({ type: "RemoveRecipeFromCart", payload: id });
  };

  const handlePriceForOrder = (price, recipeName) => {
    console.log(price, recipeName);
    
    dispatch({
      type: "GetPriceForOrder",
      payload: { price: price, recipeName: recipeName },
    });
  };



  return (
    <div className="px-4 md:px-14 lg:px-32 xl:px-44 py-6 flex flex-col gap-y-4">
      {state?.cart.length === 0 && (
        <div className="flex flex-col gap-10 my-20">
          <p className="text-center text-gray-500 text-lg mt-6">
            Your cart is empty! Add some delicious salad recipes to enjoy.
          </p>

          <div className=" m-auto">
            <Link
              to="/recipe-list"
              className="px-6 py-3 bg-green-500 text-white-500 rounded-md"
            >
              Add Recipes to Cart
            </Link>
          </div>
        </div>
      )}

      {state?.cart.map((recipe, recipeIndex) => (
        <div
          className="flex gap-8 border-b border-white-200 pb-4"
          key={recipeIndex}
        >
          <div className="w-60 h-40 border flex flex-wrap justify-start overflow-y-auto rounded">
            {["base", "topping", "dressing", "extra", "vegetable"].map(
              (category, index) =>
                recipe[index]?.[category]?.length > 0 &&
                recipe[index]?.[category].map((item) => (
                  <div className="h-16 shadow-lg" key={item.id}>
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/${item.img}`}
                      alt={item.title}
                    />
                  </div>
                ))
            )}
            {recipe.img && (
              <div className=" shadow-lg" key={recipeIndex}>
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}/${recipe.img}`}
                  alt={recipe.title}
                />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-black-600">
              {recipe[5]?.recipeName || recipe?.title}
            </h1>

            {recipe?.ingredients ? (
              <div className="flex gap-1">
                {recipe?.ingredients.map((ing, index) => (
                  <div key={index}>
                    {ing.title}
                    {recipe?.ingredients?.length > 1 && ","}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-1">
                {["base", "topping", "dressing", "extra", "vegetable"].map(
                  (category, categoryIndex) =>
                    recipe[categoryIndex]?.[category]?.length > 0 &&
                    recipe[categoryIndex]?.[category].map((item, itemIndex) => (
                      <div key={itemIndex}>
                        {item.title}
                        {recipe[categoryIndex]?.[category]?.length > 1 && ","}
                      </div>
                    ))
                )}
              </div>
            )}

            {recipe.price ? (
              <p className="text-black-600">
                Total Price: <strong>₹ {recipe.price}</strong>
              </p>
            ) : (
              <p className="text-black-600">
                Total Price: <strong>₹{calculateTotalPrice(recipe)}</strong>
              </p>
            )}

            {recipe.price ? (
              <p className="text-black-600">
                Total Calories: <strong> {recipe?.calories}</strong>
              </p>
            ) : (
              <p className="text-black-600">
                Total Calories:{" "}
                <strong>{calculateTotalCalories(recipe)} kcal</strong>
              </p>
            )}
            <div className="flex gap-6 mt-5">
              <Link
                to="/order"
                className="text-sm bg-green-500 py-2 text-center px-4 rounded-md text-white-500"
                onClick={() =>
                  handlePriceForOrder(
                    calculateTotalPrice(recipe),
                    recipe[5]?.recipeName
                  )
                }
              >
                Order
              </Link>
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
