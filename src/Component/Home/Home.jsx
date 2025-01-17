import React from "react";
import { Hero } from "./Hero";
import { PopuralSalad } from "./PopuralSalad";
import { ExploreSalad } from "./ExploreSalad";
import { CustomSalad } from "./CustomSalad/CustomSalad";

export const Home = () => {
  return (
    <>
      <Hero />
      <ExploreSalad />
      <PopuralSalad />
      <CustomSalad />
    </>
  );
};
