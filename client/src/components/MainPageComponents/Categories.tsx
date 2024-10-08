const data = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Fashion" },
  { id: 3, name: "Home " },
  { id: 4, name: "Beauty " },
  { id: 5, name: "Sports" },
  { id: 6, name: "Books" },
  { id: 7, name: "Toys" },
  { id: 8, name: "Automotive" },
  { id: 9, name: "Health" },
  { id: 10, name: "Pet Supplies" },
];

const Categories = () => {
  return (
    <div className="flex justify-between h-32 w-full">
      {data.map((item) => {
        return (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center cursor-pointer"
          >
            <div className="h-24 w-24 center border-2 border-black rounded-full text-4xl">
              {item.name.charAt(0)}
            </div>
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
