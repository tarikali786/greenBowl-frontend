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

            <div className="flex gap-6 mt-5">
              {recipe.price ? (
                <Link
                  to="/checkout"
                  className={`text-sm bg-green-500 py-2 text-center px-4 rounded-md text-white-500 `}
                  onClick={() =>
                    handlePriceForOrder(recipe?.price, recipe?.name, recipe?.id)
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
                      recipe?.total_price,
                      recipe?.name,
                      recipe?.id
                    )
                  }
                >
                  Order
                </Link>
              )}
              <button
                className="text-sm bg-red-600 py-2 text-center px-4 rounded-md text-white-500"
                onClick={() => handleRemoveRecipe(recipe.uid)}
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
