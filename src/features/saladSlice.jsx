import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  base: [],
  topping: [],
  dressing: [],
  vegetable: [],
  extra: [],
  exploreData: [],
  popularData: [],
  loading: false,
  error: "",
  recipe: [],
  cart: [],
  orderDetails: {
    price: "",
    recipeName: "",
    id: "",
  },
  OrderItem: [],
  createRecipe: [
    { base: [] },
    { topping: [] },
    { dressing: [] },
    { extra: [] },
    { vegetable: [] },
  ],
  searchItem: {},
};

export const fetchHomePageData = createAsyncThunk(
  "salad/fetchHomePageData",
  async () => {
    const api = `${import.meta.env.VITE_API_URL}/salad/home-salad/`;
    const response = await axios.get(api);
    return response.data;
  }
);

export const saladSlice = createSlice({
  name: "salad",
  initialState,
  reducers: {
    createRecipe: (state, action) => {
      const typeKey = action.payload.type.toLowerCase();
      const data = action.payload.data;
      state.createRecipe = state?.createRecipe.map((section) =>
        section[typeKey] && Array.isArray(section[typeKey])
          ? {
              ...section,
              [typeKey]: [...section[typeKey], data],
            }
          : section
      );
    },

    removeItemFromRecipe: (state, action) => {
      const typeKey = action.payload.type.toLowerCase();
      const id = action.payload.id;
      state.createRecipe = state.createRecipe.map((section) =>
        section[typeKey] && Array.isArray(section[typeKey])
          ? {
              ...section,
              [typeKey]: section[typeKey].filter((item) => item.id !== id),
            }
          : section
      );
    },
    saveRecipe: (state, action) => {
      const newRecipe = {
        id: nanoid(),
        ...action.payload.data,
        recipeName: action.payload.recipeName,
      };
      state.recipe.push(newRecipe);
      state.createRecipe = [
        { base: [] },
        { topping: [] },
        { dressing: [] },
        { extra: [] },
        { vegetable: [] },
      ];
    },

    removeRecipeFromList: (state, action) => {
      state.recipe = state.recipe.filter((item) => item.id !== action.payload);
    },

    addRecipeTocart: (state, action) => {
      state.cart.push(action.payload);
    },

    removeRecipeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    increaseWeightOfItem: (state, action) => {
      const { id, weightChange, typeKey } = action.payload;
      if (state[typeKey] && Array.isArray(state[typeKey])) {
        state[typeKey] = state[typeKey].map((item) =>
          item.id === id
            ? {
                ...item,
                weight:
                  (item.weight ? parseInt(item.weight, 10) : 250) +
                  parseInt(weightChange, 10),
                price: Math.floor(item.price * 1.5),
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
} = saladSlice.actions;

export default saladSlice.reducer;
