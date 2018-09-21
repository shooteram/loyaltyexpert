import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import Product from "./components/Product";
import SearchBar from "./components/SearchBar";

class App extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { fetching, products, error } = { ...this.props };

    return fetching ? (
      <div>fetching ...</div>
    ) : (
      <div>
        <div className="container mx-auto p-4">
          {products && (
            <React.Fragment>
              <h2 className="mb-4">Products ({products.length})</h2>
              <SearchBar className="mb-3 w-full" />

              <div className="flex flex-wrap -mx-2 cursor-default">
                {products.map((product, key) => {
                  return <Product key={key} data={product} />;
                })}
              </div>
            </React.Fragment>
          )}

          <p>{error}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.fetching,
  products: state.products,
  error: state.error,
});

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => {
      dispatch({ type: actions.FETCH_PRODUCTS });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
