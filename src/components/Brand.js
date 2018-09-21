import React from "react";

class Brand extends React.Component {
  render() {
    const { name } = { ...this.props.data };

    return (
      <span className="ml-3 float-right text-sm text-grey-dark border-b">
        {name}
      </span>
    );
  }
}

export default Brand;
