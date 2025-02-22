import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";

const ImageComponent = ({ src, alt, imgCss, cardCss, variant }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={`relative flex items-center justify-center   ${
        cardCss || "w-full h-auto  "
      }`}
    >
      {loading && (
        <Skeleton
          variant={variant || "rounded"}
          width="100%"
          height="100%"
          className="absolute inset-0"
        />
      )}

      <img
        src={`${import.meta.env.VITE_LIVE_URL}${src}`}
        alt={alt || "Image"}
        className={` ${imgCss || "object-contain"} ${loading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setLoading(false)}
        loading="lazy"
      />
    </div>
  );
};

export default ImageComponent;
