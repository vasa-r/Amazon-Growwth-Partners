import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <section className="h-screen grid place-content-center">
        <div className="max-w-[58rem] flex flex-col items-center mx-auto">
          <h1 className="text-center text-5xl font-bold leading-[4rem] text-transparent bg-clip-text bg-gradient-to-r from-black/50 via-yellow-500 to-orange-500">
            Transform Your Finds into Fast Purchases!
            <br />
            Shop Easy, Live Better!
          </h1>
          <p className="text-center my-10 text-xl mx-auto">
            Say goodbye to cluttered carts! With our seamless shopping
            experience, you can find and purchase your favorite items in just a
            few clicks. Enjoy hassle-free browsing—quick, easy, and no account
            needed!
          </p>

          <Link className="btn py-7 btn-primary" to={"/auth/signup"}>
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
