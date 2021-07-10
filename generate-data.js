const faker = require("faker");
const fs = require("fs");
faker.locale = "vi";

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];

  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    categoryList.push(category);
  });
  return categoryList;
};

const randomProductList = (categoryList, total) => {
  if (total <= 0) return [];
  const productList = [];
  for (const category of categoryList) {
    Array.from(new Array(total)).forEach(() => {
      const product = {
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        description: faker.commerce.productDescription(),
        price: Number.parseFloat(faker.commerce.price()),
        thumbnailURL: faker.image.imageUrl(400, 400),
        categoryId: category.id,
      };
      productList.push(product);
    });
  }
  return productList;
};

(() => {
  const categoryList = randomCategoryList(15);
  const productList = randomProductList(categoryList, 40);
  const data = {
    products: productList,
    categories: categoryList,
    notifications: [],
    role: [],
    feedback: [],
  };
  fs.writeFile("db.json", JSON.stringify(data), () => { });
})();
