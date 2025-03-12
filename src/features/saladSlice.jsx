import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { get, post, remove } from "../Helper/Api/api";
import { userData } from "../Helper/Helper";
import { toast } from "react-toastify";
const initialState = {
  base: [],
  topping: [],
  dressing: [],
  vegetable: [],
  extra: [],
  exploreData: [],
  popularData: [],
  loading: false,
  loadingRecipe: false,
  error: "",
  recipe: [],
  cart: [],
  orderDetails: {
    price: "",
    recipeName: "",
    id: "",
  },
  OrderItem: [],
  createRecipe: [],
  EditCustomRecipe: {},
  searchItem: {},
  userDetails: "",
};
const { access_green } = userData();
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${access_green}`,
};
export const fetchHomePageData = createAsyncThunk(
  "salad/fetchHomePageData",
  async () => {
    const api = `${import.meta.env.VITE_API_URL}/salad/home-salad/`;
    const response = await axios.get(api);
    return response.data;
  }
);

export const fetchUserDetails = createAsyncThunk("user/address", async () => {
  const api = "/account/user-details/";
  const response = await get(api, { headers });
  return response.data;
});

export const fetchUserRecipeList = createAsyncThunk(
  "user/recipeList",
  async () => {
    const response = await get("/salad/recipe/", { headers });
    return response.data;
  }
);

export const deleteUserRecipeList = createAsyncThunk(
  "salad/recipe",
  async (uid) => {
    const response = await remove(`/salad/recipe/${uid}/`, { headers });
    return uid;
  }
);

export const saveRecipeItem = createAsyncThunk("salad/Recipe", async (data) => {
  const api = "/salad/recipe/";
  const response = await post(api, data, { headers });
  return response.data;
});

export const saladSlice = createSlice({
  name: "salad",
  initialState,
  reducers: {
    createRecipe: (state, action) => {
      const data = action.payload.data;
      state.createRecipe.push(data);
    },
    removeItemFromRecipe: (state, action) => {
      const uid = action.payload.uid;
      state.createRecipe = state.createRecipe.filter(
        (item) => item.uid !== uid
      );
    },

    removeRecipeFromList: (state, action) => {
      state.recipe = state.recipe.filter((item) => item.id !== action.payload);
    },

    addRecipeTocart: (state, action) => {
      state.cart.push(action.payload);
    },

    removeRecipeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.uid !== action.payload);
    },

    increaseWeightOfItem: (state, action) => {
      const { typeKey, uid, weightChange, price } = action.payload;

      if (state[typeKey] && Array.isArray(state[typeKey])) {
        state[typeKey] = state[typeKey].map((item) =>
          item.uid === uid
            ? {
                ...item,
                weight:
                  (parseFloat(item.weight) || 500) + parseFloat(weightChange),
                updatedPrice:
                  parseFloat(item.updatedPrice ?? item.price) +
                  parseFloat(price),

                updatedCalories: Math.round(
                  (parseFloat(item.calories) / 100) *
                    ((parseFloat(item.weight) || 500) +
                      parseFloat(weightChange))
                ), // Recalculate calories
              }
            : item
        );
      }
    },

    decreaseWeightOfItem: (state, action) => {
      const { typeKey, uid, weightChange, price } = action.payload;

      if (state[typeKey] && Array.isArray(state[typeKey])) {
        state[typeKey] = state[typeKey].map((item) =>
          item.uid === uid
            ? {
                ...item,
                weight: Math.max(
                  500,
                  (parseFloat(item.weight) || 500) - parseFloat(weightChange)
                ),
                updatedPrice:
                  parseFloat(item.updatedPrice ?? item.price) -
                  parseFloat(price),

                updatedCalories: Math.round(
                  (parseFloat(item.calories) / 100) *
                    Math.max(
                      500,
                      (parseFloat(item.weight) || 500) -
                        parseFloat(weightChange)
                    )
                ),
              }
            : item
        );
      }
    },

    saveOrderRecipeDetails: (state, action) => {
      state.orderDetails.price = action.payload.price;
      state.orderDetails.recipeName = action.payload.recipeName;
      state.orderDetails.id = action.payload.id;
    },

    saveOderItem: (state, action) => {
      const item = state.cart.filter((item) => item.id === action.payload);
      state.OrderItem.push(item[0]);
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    editRecipeItem: (state, action) => {
      state.EditCustomRecipe = state.recipe.find(
        (item) => item.uid === action.payload
      );
    },

   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomePageData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHomePageData.fulfilled, (state, action) => {
      state.loading = false;
      state.exploreData = action.payload.most_loved_salads;
      state.popularData = action.payload.popular_salads;
      state.base = action.payload.base_ingredients;
      state.dressing = action.payload.dressing_ingredients;
      state.extra = action.payload.extra_ingredients;
      state.topping = action.payload.topping_ingredients;
      state.vegetable = action.payload.vegetable_ingredients;
    });
    builder.addCase(fetchHomePageData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    // get User profile

    builder.addCase(fetchUserDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.userDetails = action?.payload.data;
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.loading = false;
    });

    // Save Recipe Item
    builder.addCase(saveRecipeItem.pending, (state, action) => {
      state.loadingRecipe = true;
    });
    builder.addCase(saveRecipeItem.fulfilled, (state, action) => {
      state.recipe.push(action.payload);
      state.loadingRecipe = false;
      state.createRecipe = [];
    });
    builder.addCase(saveRecipeItem.rejected, (state, action) => {
      state.error = action.payload;
      console.log(state.error);
      state.loadingRecipe = false;
    });
    // Fetch Recipe List
    builder.addCase(fetchUserRecipeList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserRecipeList.fulfilled, (state, action) => {
      state.loading = false;
      state.recipe = action.payload;
    });
    builder.addCase(fetchUserRecipeList.rejected, (state, action) => {
      state.loading = false;
    });
    // delete Recipe

    builder.addCase(deleteUserRecipeList.pending, (state, action) => {
      state.loadingRecipe = true;
    });

    builder.addCase(deleteUserRecipeList.fulfilled, (state, action) => {
      state.recipe = state.recipe.filter(
        (recipe) => recipe.uid !== action.payload
      );
      state.loadingRecipe = false;
    });
    builder.addCase(deleteUserRecipeList.rejected, (state, action) => {
      state.loadingRecipe = false;
    });
  },
});

export const {
  createRecipe,
  removeItemFromRecipe,
  saveRecipe,
  removeRecipeFromList,
  addRecipeTocart,
  removeRecipeFromCart,
  increaseWeightOfItem,
  saveOrderRecipeDetails,
  saveOderItem,
  decreaseWeightOfItem,
  editRecipeItem,
} = saladSlice.actions;

export default saladSlice.reducer;
