interface ItemProps {
  image: string;
  title: string;
  price: number;
}

const MainItem = ({ image, title, price }: ItemProps) => {
  return (
    <div className="border border-black rounded-md p-3 cursor-pointer">
      <img className="rounded-md w-full h-36" src={image} alt="img" />
      <div className="flex justify-between items-center mt-3">
        <p className="text-lg">{title}</p>
        <div className="text-lg center">₹ {Math.ceil(price * 83)}</div>
      </div>
    </div>
  );
};

export default MainItem;
