export const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Queries", to: "/query" },
];

export const formatCategoryName = (category: string) => {
  const formattedCategory = category.toLowerCase();
  switch (formattedCategory) {
    case "home-decoration":
      return "home-decor";
    case "mens-watches":
      return "watches";
    case "kitchen-accessories":
      return "kitchen-items";
    case "mens-shoes":
      return "shoes";
    case "mens-shirts":
      return "shirts";
    default:
      return formattedCategory;
  }
};
