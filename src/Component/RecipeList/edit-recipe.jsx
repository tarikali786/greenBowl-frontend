import ImageComponent from "../Common/ImageComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import ScaleRoundedIcon from "@mui/icons-material/ScaleRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

import { useEffect, useState } from "react";
import { get, post } from "../../Helper/Api/api";

export const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipeDetail, setRecipeDetail] = useState({
    uid: "",
    name: "",
    user: null,
    total_price: "",
    total_calories: "",
    ingredients: [],
  });

  const fetchrecipeDetail = async () => {
    const api = `/salad/recipe-details/${id}/`;
    const response = await get(api);

    if (response.status == 200) {
      setRecipeDetail(response?.data?.data);
    } else {
      window.location.href = "/recipe-list";
    }
  };
  console.log(recipeDetail);

  useEffect(() => {
    fetchrecipeDetail();
  }, [id]);



  const handleRemoveItemFromRecipe = (uid) => {
    setRecipeDetail((prev) => {
      const updatedIngredients = prev.ingredients.filter(
        (item) => item.ingredient.uid !== uid
      );

      const updatedTotalPrice = updatedIngredients
        .reduce((sum, item) => sum + parseFloat(item.price), 0)
        .toFixed(2);
      const updatedTotalCalories = updatedIngredients
        .reduce((sum, item) => sum + parseFloat(item.calories), 0)
        .toFixed(0);

      return {
        ...prev,
        ingredients: updatedIngredients,
        total_price: updatedTotalPrice,
        total_calories: updatedTotalCalories,
      };
    });
  };

  const handleRecipeOnchange = (e) => {
    setRecipeDetail((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  // ✅ Increase Weight Inside Component
  const handleIncreaseWeight = (uid) => {
    setRecipeDetail((prev) => {
      const updatedIngredients = prev.ingredients.map((item) => {
        if (item.ingredient.uid === uid) {
          const newWeight = parseFloat(item.weight) + 250;
          const newPrice =
            (parseFloat(item.ingredient.price) / 500) * newWeight;
          const newCalories =
            (parseFloat(item.ingredient.calories) / 500) * newWeight;

          return {
            ...item,
            weight: newWeight.toFixed(2),
            price: newPrice.toFixed(2),
            calories: newCalories.toFixed(0),
          };
        }
        return item;
      });

      const updatedTotalPrice = updatedIngredients
        .reduce((sum, item) => sum + parseFloat(item.price), 0)
        .toFixed(2);
      const updatedTotalCalories = updatedIngredients
        .reduce((sum, item) => sum + parseFloat(item.calories), 0)
        .toFixed(0);

      return {
        ...prev,
        ingredients: updatedIngredients,
        total_price: updatedTotalPrice,
        total_calories: updatedTotalCalories,
      };
    });
  };

  // ✅ Decrease Weight Inside Component
  const handleDecreaseWeight = (uid) => {
    setRecipeDetail((prev) => {
      const updatedIngredients = prev.ingredients.map((item) => {
        if (item.ingredient.uid === uid && parseFloat(item.weight) > 250) {
          const newWeight = parseFloat(item.weight) - 250;
          const newPrice =
            (parseFloat(item.ingredient.price) / 500) * newWeight;
          const newCalories =
            (parseFloat(item.ingredient.calories) / 500) * newWeight;

          return {
            ...item,
            weight: newWeight.toFixed(2),
            price: newPrice.toFixed(2),
            calories: newCalories.toFixed(0),
          };
        }
        return item;
      });

      const updatedTotalPrice = updatedIngredients
        .reduce((sum, item) => sum + parseFloat(item.price), 0)
        .toFixed(2);
      const updatedTotalCalories = updatedIngredients
        .reduce((sum, item) => sum + parseFloat(item.calories), 0)
        .toFixed(0);

      return {
        ...prev,
        ingredients: updatedIngredients,
        total_price: updatedTotalPrice,
        total_calories: updatedTotalCalories,
      };
    });
  };

  return (
    <div className="px-4 md:px-14 lg:px-34 xl:px-44 py-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">Edit Recipe</h1>

        <button className="text-lg bg-green-500 text-white-500 px-3 py-[6px] rounded-xl">
          Save
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Recipe Name"
          value={recipeDetail?.name}
          className="border p-2 rounded-md"
          onChange={handleRecipeOnchange}
        />
        <div className="flex  gap-4">
          <p>
            Total Calories: <b> {recipeDetail?.total_calories} KCal</b>
          </p>

          <p>
            Total Price: <b> {recipeDetail?.total_price} KCal</b>
          </p>
        </div>
        <p>
          Recipe Id: <b>{recipeDetail?.uid}</b>{" "}
        </p>
      </div>
      <div className="my-8 grid mm:grid-cols-2 lg:grid-cols-3  gap-8 ">
        {recipeDetail?.ingredients?.map((item) => (
          <div className="country-Card" key={item.id}>
            <div className="flex flex-col items-left justify-left gap-2 shadow-lg rounded-md p-2">
              <ImageComponent
                src={item?.ingredient?.image}
                cardCss=" w-full h-[22vh]  md:h-[26vh] lg:h-[28vh] xl:h-[32vh] rounded-lg shadow-xl overflow-hidden"
                imgCss="object-cover transition-transform duration-500 ease-in-out hover:scale-150"
              />

              <div className="flex items-center justify-between my-2">
                <p className="text-[18px] font-semibold text-black-600 mt-1">
                  {item?.ingredient?.name}
                </p>
                <div className="flex items-center gap-2">
                  <ScaleRoundedIcon className="text-green-600" />
                  <div className="bg-white-400 rounded-md flex items-center overflow-hidden">
                    <p className="outline-none px-1 pl-2">
                      {parseInt(item?.weight)}g
                    </p>
                    <button
                      onClick={() => handleIncreaseWeight(item.ingredient.uid)}
                      className="px-3 py-1 bg-green-500 text-white font-bold text-xl"
                    >
                      +
                    </button>
                    {parseInt(item.weight) > 500 && (
                      <button
                        onClick={() =>
                          handleDecreaseWeight(item.ingredient.uid)
                        }
                        className="px-2 py-1 bg-red-500 text-white font-bold text-xl"
                      >
                        <RemoveIcon
                          style={{ fontSize: "24px", width: "16px" }}
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-[16px] font-semibold text-black-600 flex items-center gap-1">
                <StarsRoundedIcon className="text-green-600 " />{" "}
                {item?.ingredient?.rating ?? 4.5}{" "}
                <WhatshotRoundedIcon className="text-green-600 ml-2" />{" "}
                {item?.calories ?? item?.ingredient?.calories} KCal
              </p>
              <p className="text-sm text-black-200 line-clamp-2">
                {item.ingredient.description}
              </p>

              <div className="flex justify-between mt-2 items-center">
                <p>
                  <CurrencyRupeeRoundedIcon className="text-green-600" />{" "}
                  {parseInt(item?.price ?? item?.ingredient?.price)}
                </p>

                <button
                  className={`px-5 py-1 text-white-500 rounded-md bg-red-500 `}
                  onClick={() =>
                    handleRemoveItemFromRecipe(item.ingredient.uid)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
