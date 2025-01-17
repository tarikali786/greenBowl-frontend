import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the default CSS
import { HomeHeroData } from "../Data/data";

export const Hero = () => {
  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={500}
      >
        {HomeHeroData.map((img, index) => (
          <div key={index} className="h-[40vh] md:h-[50vh] lg:h-[65vh] xl:h-[72.5vh]">
            <img
              src={img.img}
              alt={`Slide ${index + 1}`}
              className=" object-fill aspect-[15/22] "
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
