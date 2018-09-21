import React from "react";

class Category extends React.Component {
  render() {
    const { name } = { ...this.props.data };

    return <div className="text-sm text-grey-dark border-b">{name}</div>;
  }
}

export default Category;
