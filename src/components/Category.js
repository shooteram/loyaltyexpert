import React from "react";

class Category extends React.Component {
  render() {
    const { name } = { ...this.props.data };

    return (
      <span className="rounded text-xs no-underline text-blue text-center bg-blue-lightest py-1 px-4">
        {name}
      </span>
    );
  }
}

export default Category;
