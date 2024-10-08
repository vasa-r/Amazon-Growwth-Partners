import React from "react";
import Categories from "../components/MainPageComponents/Categories";
import MainItem from "../components/MainPageComponents/MainItem";

const MainPage = () => {
  return (
    <div className="btm-comp p-10 ">
      <section className="">
        <h3 className="text-2xl pb-3">Categories</h3>
        <Categories />
      </section>
      <section className="mt-5">
        <h3 className="text-2xl pb-3">Products</h3>
        <div className="grid grid-cols-4 gap-7">
          <MainItem />
          <MainItem />
          <MainItem />
          <MainItem />
          <MainItem />
          <MainItem />
          <MainItem />
          <MainItem />
        </div>
      </section>
    </div>
  );
};

export default MainPage;
