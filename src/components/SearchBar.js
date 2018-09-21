import React from "react";
import cn from "classnames";

class SearchBar extends React.Component {
  render() {
    const { className, onChange } = { ...this.props };

    return (
      <input
        className={cn(
          "shadow appearance-none border rounded py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline",
          className,
        )}
        type="search"
        placeholder="Search ..."
        onChange={onChange}
      />
    );
  }
}

export default SearchBar;
