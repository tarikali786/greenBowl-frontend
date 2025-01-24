import { createContext, useContext, useReducer, useState } from "react";
import {
  CustomBaseData,
  CustomDressingsData,
  CustomExtrasData,
  CustomToppingsData,
  CustomVegetablesdata,
} from "../Data/data";

// Create Context
const SaladContext = createContext();

// Initial State
const initialState = {
  base: CustomBaseData || [],
  topping: CustomToppingsData || [],
  dressing: CustomDressingsData || [],
  vegetable: CustomVegetablesdata || [],
  extra: CustomExtrasData || [],
  recipe: [],
  cart: [],
  orderPrice: {
    recipeName: "",
    price: "",
  },
  createRecipe: [
    { base: [] },
    { topping: [] },
    { dressing: [] },
    { extra: [] },
    { vegetable: [] },
    { recipeName: "" },
  ],
};

// Reducer Function
const saladReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_RECIPE": {
      const typeKey = action.payload.type.toLowerCase();
      const data = action.payload.data;
      return {
        ...state,
        createRecipe: state.createRecipe.map((section) =>
          section[typeKey]
            ? {
                ...section,
                [typeKey]: [...section[typeKey], data],
              }
            : section
        ),
      };
    }

    case "REMOVE_ITEM_FROM_RECIPE": {
      const typeKey = action.payload.type.toLowerCase();
      const id = action.payload.id;
      return {
        ...state,
        createRecipe: state.createRecipe.map((section) =>
          section[typeKey]
            ? {
                ...section,
                [typeKey]: section[typeKey].filter((item) => item.id !== id),
              }
            : section
        ),
      };
    }

    case "SAVE_RECIPE": {
      const initialCreateRecipe = [
        { base: [] },
        { topping: [] },
        { dressing: [] },
        { extra: [] },
        { vegetable: [] },
        { recipeName: "" },
      ];
      const UpdateRecipe = {
        ...action.payload,
        id: new Date().getTime(),
      };
      return {
        ...state,
        recipe: [...state.recipe, UpdateRecipe],
        createRecipe: initialCreateRecipe,
      };
    }

    case "RemoveRecipeFromList":
      return {
        ...state,
        recipe: state.recipe.filter((item) => item.id !== action.payload),
      };

    case "AddRecipeToCart":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "RemoveRecipeFromCart":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "GetPriceForOrder":
      return {
        ...state,
        priceForOrder: {
          ...state.priceForOrder,
          price: action.payload.price,
          recipeName: action.payload.recipeName,
        },
      };

    default:
      return state;
  }
};

// Provider Component
export const SaladProvider = ({ children }) => {
  const [state, dispatch] = useReducer(saladReducer, initialState);
  const [price, setPrice] = useState();
  return (
    <SaladContext.Provider value={{ state, dispatch, setPrice, price }}>
      {children}
    </SaladContext.Provider>
  );
};

// Custom hook to use the context
export const useSaladContext = () => {
  return useContext(SaladContext);
};
