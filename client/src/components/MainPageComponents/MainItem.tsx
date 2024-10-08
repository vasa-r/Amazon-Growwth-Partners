import React from "react";

const MainItem = () => {
  return (
    <div className="border border-black rounded-md p-3 cursor-pointer">
      <img
        className="rounded-md w-full"
        src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg"
        alt="img"
      />
      <div className="flex justify-between items-center mt-3">
        <div>
          <p>item name</p>
          <p>price</p>
        </div>
        <div className="cursor-pointer" title="add to wishlist">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MainItem;
