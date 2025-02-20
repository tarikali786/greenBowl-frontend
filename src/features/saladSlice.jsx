import { createSlice, nanoid } from "@reduxjs/toolkit";
import {
  CustomBaseData,
  CustomDressingsData,
  CustomExtrasData,
  CustomToppingsData,
  CustomVegetablesdata,
  ExploreSaladData,
  PopularSaladData,
} from "../Component/Data/data";

const initialState = {
  base: CustomBaseData || [],
  topping: CustomToppingsData || [],
  dressing: CustomDressingsData || [],
  vegetable: CustomVegetablesdata || [],
  extra: CustomExtrasData || [],
  exploreData: ExploreSaladData || [],
  popularData: PopularSaladData || [],
  recipe: [],
  cart: [],
  price: 220,
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
