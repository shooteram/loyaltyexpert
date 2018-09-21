import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import Product from "./components/Product";
import SearchBar from "./components/SearchBar";
import Pagination from "react-js-pagination";
import { chunk } from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: null, visibleProducts: null, activePage: 1 };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  handlePageChange(page) {
    let products = chunk(this.state.products, 10);
    this.setState({ visibleProducts: products[page - 1], activePage: page });
  }

  componentDidUpdate() {
    if (this.props.products && !this.state.visibleProducts) {
      this.setState({ products: this.props.products });
      this.handlePageChange(this.state.activePage);
    }
  }

  handleSearch(e) {
    let value = e.target.value;
    if (!value) return this.handlePageChange(1);

    let result = this.state.products.filter(
      product => product.name.indexOf(value) >= 0,
    );

    this.setState({ visibleProducts: result });
  }

  render() {
    const { fetching, error } = { ...this.props };
    const { products, visibleProducts } = { ...this.state };

    return fetching ? (
      <div>fetching ...</div>
    ) : (
      <div>
        <div className="container mx-auto p-4">
          {visibleProducts && (
            <React.Fragment>
              <h2 className="mb-4">Products ({products.length})</h2>
              <SearchBar onChange={this.handleSearch} className="mb-3 w-full" />

              <div className="flex flex-wrap -mx-2 cursor-default">
                {visibleProducts.map((product, key) => {
                  return <Product key={key} data={product} />;
                })}
              </div>

              <div className="text-center">
                <Pagination
                  hideDisabled
                  activePage={this.state.activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={products.length}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                  activeLinkClass="active"
                />
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
