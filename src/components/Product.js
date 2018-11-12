import React from "react";
import Category from "./Category";
import Brand from "./Brand";

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = { imageLoaded: false };
    this.imageLoaded = this.imageLoaded.bind(this);
  }

  imageLoaded() {
    this.setState({ imageLoaded: true });
  }

  render() {
    const { name, image, description, categories, brand } = {
      ...this.props.data,
    };
    const { onClick } = { ...this.props };
    const { imageLoaded } = { ...this.state };

    return (
      <div
        onClick={onClick}
        className="text-black no-underline flex w-full lg:w-1/2 px-2 mb-3"
      >
        <div className="transition border-b-2 shadow hover:shadow-md w-full bg-white rounded-lg p-4 flex leading-normal cursor-pointer">
          <div
            className={`w-1/4 mr-4 text-center ${
              imageLoaded ? "visible" : "invisible absolute"
            }`}
          >
            {image && (
              <img
                onLoad={this.imageLoaded}
                className="rounded-full w-16 h-16"
                src={image}
                alt=""
              />
            )}
          </div>

          <div className={`transition ${imageLoaded ? "w-3/4" : "w-full"}`}>
            {brand && <Brand data={brand} />}

            <h4 className="truncate mb-2" title={name}>
              {name}
            </h4>

            <p>{description}</p>

            <div className="float-right">
              {categories.length > 0 &&
                categories.map((category, key) => {
                  return <Category key={key} data={category} />;
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
