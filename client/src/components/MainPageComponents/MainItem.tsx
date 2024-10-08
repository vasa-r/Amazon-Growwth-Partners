import { useNavigate } from "react-router-dom";

interface ItemProps {
  image: string;
  title: string;
  price: number;
  id: string;
}

const MainItem = ({ image, title, price, id }: ItemProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="border border-black rounded-md p-3 cursor-pointer"
      onClick={() => navigate(`/products/${id}`)}
    >
      <img className="rounded-md w-full h-36" src={image} alt="img" />
      <div className="flex justify-between items-center mt-3">
        <p className="text-lg">{title}</p>
        <div className="text-lg center">₹ {Math.ceil(price * 83)}</div>
      </div>
    </div>
  );
};

export default MainItem;
