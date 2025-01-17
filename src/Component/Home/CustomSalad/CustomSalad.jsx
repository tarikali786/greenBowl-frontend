import { Base } from "./Base";
import { Vegetables } from "./Vegetables";
import { Topping } from "./Topping";
import { Dressing } from "./Dressing";
import { Extra } from "./Extra";

export const CustomSalad = () => {
  return (
    <div className=" px-4 md:px-14 lg:px-24 xl:px-44">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-black-600">
          Create Your Own Salad
        </h1>
        <p className="text-base md:text-lg text-black-300 mt-2">
          Choose from a variety of fresh ingredients and build a salad that
          suits your taste!
        </p>
      </div>

      <Base />
      <Vegetables />
      <Topping />
      <Dressing />
      <Extra />
    </div>
  );
};
