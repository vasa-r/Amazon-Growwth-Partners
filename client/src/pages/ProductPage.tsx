import { useEffect, useState } from "react";
import star from "../assets/star.svg";
import minus from "../assets/minus.svg";
import plus from "../assets/plus.svg";
import CartModal from "../components/modals/CartModal";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../api/product";

interface Items {
  category: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  shippingInformation: string;
  title: string;
  _id: string;
}

const ProductPage = () => {
  const [product, setProduct] = useState<Items | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [cartModal, setCartModal] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    getProduct();
  }, []);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const handleAddCart = () => {
    // console.log(quantity, product?.title, product?.image, product?.price);
    const data = {
      quantity: quantity,
      title: product?.title,
      image: product?.image,
      price: Math.ceil(product?.price ? product?.price : 0),
      id: product?._id,
    };
    const key = `cartItem_${product?._id}`;
    window.localStorage.setItem(key, JSON.stringify(data));
    setCartModal(true);
  };

  const getProduct = async () => {
    try {
      const items = await getSingleProduct(id);
      const { data } = items.data;
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {cartModal && (
        <CartModal
          showModal={cartModal}
          setShowModal={setCartModal}
          title={product?.title}
        />
      )}

      <div className="btm-comp p-10 h-[calc(100vh-80px)] flex justify-center items-center">
        <div className="w-full flex gap-3">
          <div>
            <img
              className="h-[35rem] w-[50rem]"
              src={product?.image}
              alt="product image"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-black text-5xl font-bold">{product?.title}</h1>
            <p className="pt-7 text-black text-xl font-medium">
              {product?.description}
            </p>
            <p className="text-lg flex">
              Ratings: {product?.rating}
              <img className="w-4 fill-gold" src={star} alt="rating" />
            </p>
            <h1 className="text-3xl font-semibold mt-8">
              ₹ {product ? Math.ceil(product.price * 83) : 0}.00
            </h1>
            <p className="text-lg mt-2">{product?.shippingInformation}</p>

            <div className="flex items-center mt-8">
              <h1 className="text-2xl">Quantity: </h1>{" "}
              <div className=" w-[10rem] h-12 flex justify-between items-center p-3">
                <div
                  className="center w-12 h-12 hover:bg-slate-100 rounded-md cursor-pointer"
                  onClick={handleDecrement}
                >
                  <img className="w-6" src={minus} alt="remove" />
                </div>
                <div className="center text-2xl">{quantity}</div>
                <div
                  className="center w-12 h-12 hover:bg-slate-100 rounded-md cursor-pointer"
                  onClick={handleIncrement}
                >
                  <img className="w-6" src={plus} alt="add" />
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary mt-8 w-3/4"
              onClick={handleAddCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
