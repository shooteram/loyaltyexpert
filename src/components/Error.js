import React from "react";

class Error extends React.Component {
  render() {
    const { reload, title, description, ...rest } = {
      ...this.props,
    };

    return (
      <div
        className="fixed z-50 pin overflow-auto bg-smoke-dark flex"
        {...rest}
      >
        <div className="fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end md:justify-center py-4 px-8 bg-red-lightest border border-red md:rounded w-full md:h-auto md:shadow flex flex-col text-center">
          {title && (
            <h2 className="font-thin truncate mb-4 text-red">{title}</h2>
          )}

          {description && (
            <p className="text-red-light font-bold mb-3">{description}</p>
          )}

          <button
            className="bg-red hover:bg-red-dark text-white font-bold py-2 px-8 rounded w-full"
            onClick={reload}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }
}

export default Error;
