import React from "react";

class Form extends React.Component {
  render() {
    const { inputs, ...rest } = { ...this.props };
    const inputStyle =
      "bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-blue";

    return (
      <form {...rest}>
        {inputs.map((i, key) => {
          return (
            <div key={key} className="mb-3">
              <label
                className="block text-grey-dark font-bold mb-1 pr-4 block capitalize"
                htmlFor={i.name}
              >
                {i.name}
              </label>

              {i.tag === "input" && (
                <input
                  id={i.name}
                  name={i.name}
                  className={inputStyle}
                  type="text"
                  defaultValue={i.value}
                  required={i.required}
                />
              )}

              {i.tag === "textarea" && (
                <textarea
                  id={i.name}
                  name={i.name}
                  className={inputStyle}
                  required={i.required}
                  defaultValue={i.value}
                />
              )}

              {i.tag === "select" && (
                <select
                  id={i.name}
                  name={i.name}
                  required={i.required}
                  multiple={i.multiple}
                  className={inputStyle}
                  defaultValue={i.value}
                  disabled={i.options.length === 0}
                >
                  {!i.multiple && <option disabled />}

                  {i.options.map((o, key) => {
                    return (
                      <option key={key} value={o.id}>
                        {o.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          );
        })}

        <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-8 rounded w-full md:w-1/4">
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
