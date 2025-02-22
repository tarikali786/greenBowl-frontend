import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeRecipeFromCart,
  saveOrderRecipeDetails,
} from "../../features/saladSlice";
import ImageComponent from "../Common/ImageComponent";
export const Cart = () => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.salad.cart);

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
    dispatch(removeRecipeFromCart(id));
  };

  const handlePriceForOrder = (price, recipeName, id) => {
    dispatch(
      saveOrderRecipeDetails({
        price: price || 250,
        recipeName: recipeName,
        id: id,
      })
    );
  };
  console.log(cartList);

  return (
    <div className="px-4 md:px-14 lg:px-32 xl:px-44 py-6 flex flex-col gap-y-4">
      {cartList.length === 0 && (
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

      {cartList.map((recipe, recipeIndex) => (
        <div
          className="flex flex-wrap sm:flex-nowrap gap-8 border-b border-white-200 pb-4"
          key={recipeIndex}
        >
          <div className="w-60 h-40 border flex flex-wrap justify-start overflow-y-auto rounded">
            {recipe?.image ? (
              <ImageComponent
                key={recipe.uid}
                cardCss="shadow-lg"
                src={recipe?.image}
              />
            ) : (
              ["base", "topping", "dressing", "extra", "vegetable"].map(
                (category, index) =>
                  recipe[index]?.[category]?.length > 0 &&
                  recipe[index]?.[category].map((item) => (
                    <ImageComponent
                      key={item.uid}
                      cardCss="h-16 shadow-lg"
                      src={item.image}
                    />
                  ))
              )
            )}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-black-600">
              {recipe?.name || recipe?.recipeName}
            </h1>

            {recipe?.ingredients ? (
              <div className="flex flex-wrap gap-1">
                {recipe?.ingredients.map((ing, index) => (
                  <div key={index}>
                    {ing.name}
                    {recipe?.ingredients?.length > 1 && ","}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap   gap-1">
                {["base", "topping", "dressing", "extra", "vegetable"].map(
                  (category, categoryIndex) =>
                    recipe[categoryIndex]?.[category]?.length > 0 &&
                    recipe[categoryIndex]?.[category].map((item, itemIndex) => (
                      <div key={itemIndex}>
                        {item.name}
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

            {recipe.calories ? (
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
              {recipe.price ? (
                <Link
                  to="/checkout"
                  className={`text-sm bg-green-500 py-2 text-center px-4 rounded-md text-white-500 `}
                  onClick={() =>
                    handlePriceForOrder(
                      recipe?.price,
                      recipe?.recipeName,
                      recipe?.id
                    )
                  }
                >
                  Order
                </Link>
              ) : (
                <Link
                  to="/checkout"
                  className={`text-sm bg-green-500 py-2 text-center px-4 rounded-md text-white-500 `}
                  onClick={() =>
                    handlePriceForOrder(
                      calculateTotalPrice(recipe),
                      recipe?.recipeName,
                      recipe?.id
                    )
                  }
                >
                  Order
                </Link>
              )}
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
