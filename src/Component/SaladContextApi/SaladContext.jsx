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
  toppings: CustomToppingsData || [],
  dressing: CustomDressingsData || [],
  vegetables: CustomVegetablesdata || [],
  extras: CustomExtrasData || [],
  recipe: [],
  cart: [],
  orderPrice: {
    recipeName: "",
    price: "",
  },
  createRecipe: [
    { base: [] },
    { toppings: [] },
    { dressing: [] },
    { extra: [] },
    { vegetables: [] },
    { recipeName: "" },
  ],
};

// Reducer Function
const saladReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_RECIPE": {
      const typeKey = action.payload.type.toLowerCase();

      return {
        ...state,
        createRecipe: state.createRecipe.map((section) =>
          section[typeKey]
            ? {
                ...section,
                [typeKey]: [...section[typeKey], action.payload.data],
              }
            : section
        ),
      };
    }

    case "REMOVE_BASE": {
      return {
        ...state,
        createRecipe: state.createRecipe.map((section) =>
          section.base
            ? {
                ...section,
                base: section.base.filter((item) => item.id !== action.payload),
              }
            : section
        ),
      };
    }

    case "REMOVE_VEGETABLE": {
      return {
        ...state,
        createRecipe: state.createRecipe.map((section) =>
          section.vegetables
            ? {
                ...section,
                vegetables: section.vegetables.filter(
                  (item) => item.id !== action.payload
                ),
              }
            : section
        ),
      };
    }

    case "REMOVE_EXTRA": {
      return {
        ...state,
        createRecipe: state.createRecipe.map((section) =>
          section.extra
            ? {
                ...section,
                extra: section.extra.filter(
                  (item) => item.id !== action.payload
                ),
              }
            : section
        ),
      };
    }

    case "REMOVE_DRESSING":
      return {
        ...state,
        createRecipe: state.createRecipe.map((section) =>
          section.dressing
            ? {
                ...section,
                dressing: section.dressing.filter(
                  (item) => item.id !== action.payload
                ),
              }
            : section
        ),
      };

    case "REMOVE_TOPPING":
      return {
        ...state,
        createRecipe: state.createRecipe.map((section) =>
          section.toppings
            ? {
                ...section,
                toppings: section.toppings.filter(
                  (item) => item.id !== action.payload
                ),
              }
            : section
        ),
      };

    case "SAVE_RECIPE": {
      const initialCreateRecipe = [
        { base: [] },
        { toppings: [] },
        { dressing: [] },
        { extra: [] },
        { vegetables: [] },
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
