import { toast } from "react-toastify";
import { userData } from "../Helper";
import {
  createRecipe,
  saveRecipe,
  addRecipeTocart,
} from "../../features/saladSlice";
const protectedActions = [
  createRecipe.type,
  addRecipeTocart.type,
];

export const authMiddleware = (store) => (next) => (action) => {
  if (protectedActions.includes(action.type)) {
    const { access_green } = userData();


    if (!access_green) {
      toast.warn("Please Login");
      window.location.href = "/login";
      return;
    }
  }
  return next(action);
};
