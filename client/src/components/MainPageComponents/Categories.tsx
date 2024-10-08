import { formatCategoryName } from "../../utils/constants";

interface CateProps {
  selectedCategory: string;
  categories: string[];
  selectCategory: (cat: string) => void;
}

const Categories = ({
  selectedCategory,
  categories,
  selectCategory,
}: CateProps) => {
  return (
    <div className="flex gap-4 h-32 w-full overflow-auto whitespace-nowrap">
      <div
        className="inline-flex flex-col gap-4 w-[140px] items-center cursor-pointer"
        onClick={() => selectCategory("all")}
      >
        <div
          className={`h-24 w-24 center  rounded-full text-4xl flex items-center justify-center ${
            selectedCategory === "all"
              ? "border-green-500 text-green-500 border-2"
              : "border-black border-2"
          }`}
        >
          A
        </div>
        <p
          className={`text-lg ${
            selectedCategory === "all" ? "text-green-500" : ""
          }`}
        >
          All
        </p>
      </div>
      {categories.map((item: string, index: number) => {
        const formatName = formatCategoryName(item);
        const displayItem = `${formatName
          .charAt(0)
          .toUpperCase()}${formatName.slice(1)}`;
        return (
          <div
            key={index}
            className="inline-flex flex-col gap-4 w-[140px] items-center cursor-pointer"
            onClick={() => selectCategory(item)}
          >
            <div
              className={`h-24 w-24 center  rounded-full text-4xl flex items-center justify-center ${
                selectedCategory === item
                  ? "border-green-500 text-green-500 border-2"
                  : "border-black border-2"
              }`}
            >
              {displayItem.charAt(0)}
            </div>
            <p
              className={`text-lg ${
                selectedCategory === item ? "text-green-500" : ""
              }`}
            >
              {displayItem}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
