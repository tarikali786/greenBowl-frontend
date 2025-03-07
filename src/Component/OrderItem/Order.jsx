import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeRecipeFromCart,
  saveOrderRecipeDetails,
} from "../../features/saladSlice";
import ImageComponent from "../Common/ImageComponent";
export const Order = () => {
  const dispatch = useDispatch();
  const OrderList = useSelector((state) => state?.salad?.OrderItem);

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
    dispatch(removeRecipeFromCart(id));
  };

  const handlePriceForOrder = (price, recipeName) => {
    dispatch(saveOrderRecipeDetails({ price: price, recipeName: recipeName }));
  };

  return (
    <div className="px-4 md:px-14 lg:px-32 xl:px-44 py-6 flex flex-col gap-y-4">
      {OrderList.length === 0 && (
        <div className="flex flex-col gap-10 my-20">
          <p className="text-center text-gray-500 text-lg mt-6">
            Your order is empty! Add some delicious salads and enjoy a healthy
            meal.
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

      {OrderList?.map((recipe, recipeIndex) => (
        <div
          className="flex md:flex-nowrap flex-wrap gap-8 border-b border-white-200 pb-4"
          key={recipeIndex}
        >
          <div className="w-60 h-40 border flex  justify-start overflow-y-auto rounded">
            {recipe?.image ? (
              <ImageComponent
                key={recipe.uid}
                cardCss="shadow-lg"
                src={recipe?.image}
              />
            ) : (
              recipe?.ingredients?.map((item) => (
                <ImageComponent
                  key={item.uid}
                  cardCss="h-16 shadow-lg"
                  src={item.image}
                />
              ))
            )}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-black-600">
              {recipe?.name}
            </h1>

            <div className="flex flex-wrap gap-1">
              {recipe?.ingredients.map((ing, index) => (
                <div key={index}>{ing.name},</div>
              ))}
            </div>

            {recipe.total_price ? (
              <p className="text-black-600">
                Total Price: <strong>₹ {recipe.total_price}</strong>
              </p>
            ) : (
              <p className="text-black-600">
                Total Price: <strong>₹{recipe.price}</strong>
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
                to={`/order-details/${recipe?.uid}`}
                className={`text-sm bg-green-500 py-2 text-center px-4 rounded-md text-white-500 `}
                onClick={() =>
                  handlePriceForOrder(
                    calculateTotalPrice(recipe),
                    recipe?.recipeName
                  )
                }
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
