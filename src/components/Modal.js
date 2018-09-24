import React from "react";
import Form from "./Form";

class Modal extends React.Component {
  render() {
    const { name, image, description, brand, categories } = {
      ...this.props.data,
    };
    const { submit, close, update, brands, allCategories } = {
      ...this.props,
    };

    const productBrand = brands
      .map(_brand => {
        if (brand && _brand.id === brand.id) return _brand.id;
      })
      .join("");

    const productCategories = [];
    if (categories) {
      allCategories.map(category => {
        if (categories.some(_category => _category.id === category.id))
          productCategories.push(category.id);
      });
    }

    const inputs = [
      { tag: "input", type: "text", name: "name", value: name, required: true },
      { tag: "textarea", name: "description", value: description },
      {
        tag: "select",
        name: "brand",
        options: brands || [],
        value: productBrand,
        required: true,
      },
      {
        tag: "select",
        name: "categories",
        options: allCategories || [],
        value: productCategories,
        multiple: true,
      },
      { tag: "input", type: "text", name: "image", value: image },
    ];

    return (
      <div className="fixed z-50 pin overflow-auto bg-smoke-dark flex">
        <div className="fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end md:justify-center py-4 px-8 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col">
          <h2 className="font-thin truncate mb-4">{name || "New product"}</h2>

          <Form onSubmit={submit} onChange={update} inputs={inputs} />

          <span
            onClick={close}
            className="float absolute pin-t pin-r py-2 px-4 font-bold font-mono cursor-pointer"
          >
            x
          </span>
        </div>
      </div>
    );
  }
}

export default Modal;
