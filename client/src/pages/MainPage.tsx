import { useEffect, useState } from "react";
import Categories from "../components/MainPageComponents/Categories";
import MainItem from "../components/MainPageComponents/MainItem";
import { getAllProducts } from "../api/product";

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

const MainPage = () => {
  const [products, setProducts] = useState<Items[]>([]);
  const [categories, setcategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Items[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    getProducts();
  }, []);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  const getProducts = async () => {
    try {
      const items = await getAllProducts();
      const { data } = items.data;
      setProducts(data);
      const refinedCategories: string[] = data.map(
        (itm: Items) => itm.category
      );
      const set: string[] = [...new Set(refinedCategories)];
      setcategories(set);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="btm-comp p-10 ">
      <section className="">
        <h3 className="text-2xl pb-3">
          Categories - {selectedCategory.toUpperCase()}
        </h3>
        <Categories
          categories={categories}
          selectCategory={selectCategory}
          selectedCategory={selectedCategory}
        />
      </section>
      <section className="mt-5 p-3">
        <h3 className="text-2xl pb-3">Products</h3>
        <div className="grid grid-cols-4 gap-7">
          {filteredProducts.map((item) => (
            <MainItem
              key={item._id}
              image={item.image}
              title={item.title}
              price={item.price}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
