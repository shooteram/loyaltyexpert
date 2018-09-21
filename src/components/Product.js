import React from "react";
import Category from "./Category";
import Brand from "./Brand";

class Product extends React.Component {
  render() {
    const { name, image, description, categories, brand } = {
      ...this.props.data,
    };

    return (
      <div className="text-black no-underline flex w-full lg:w-1/2 px-2 mb-3">
        <div className="border-b-2 shadow hover:shadow-md transition w-full bg-white rounded-lg p-4 flex leading-normal">
          <div className="w-1/4 text-center">
            {image && <img className="rounded-full w-16 h-16" src={image} />}

            {categories.length > 0 &&
              categories.map((category, key) => {
                return <Category key={key} data={category} />;
              })}
          </div>

          <div className="w-3/4">
            {brand && <Brand data={brand} />}

            <h4 className="truncate mb-2" title={name}>
              {name}
            </h4>

            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
