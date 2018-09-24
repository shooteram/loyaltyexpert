export const getBrandsAndCategoriesFromProducts = products => {
  let brands = [];
  let categories = [];

  products.map(product => {
    if (
      product.brand &&
      !brands.some(brand => brand.name === product.brand.name)
    ) {
      brands.push(product.brand);
    }

    if (product.categories && product.categories.length > 0) {
      product.categories.map(category => {
        if (!categories.some(c => c.name === category.name))
          categories.push(category);
      });
    }
  });

  return { brands: brands, categories: categories };
};
