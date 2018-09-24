import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";
import Product from "./components/Product";
import SearchBar from "./components/SearchBar";
import Pagination from "react-js-pagination";
import { chunk } from "lodash";
import Modal from "./components/Modal";
import Error from "./components/Error";
import { getBrandsAndCategoriesFromProducts } from "./helpers";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      perPage: 6,
    };

    this.handleFormChanges = this.handleFormChanges.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.dismissForm = this.dismissForm.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  handlePageChange(page) {
    let products = chunk(this.state.products, this.state.perPage);
    this.setState({ visibleProducts: products[page - 1], activePage: page });
  }

  componentDidUpdate() {
    const products = this.props.products;

    if (products && !this.state.visibleProducts) {
      const { brands, categories } = getBrandsAndCategoriesFromProducts(
        products,
      );

      this.setState({
        products: products,
        categories: categories,
        brands: brands,
      });

      this.handlePageChange(this.state.activePage);
    }
  }

  handleSearch(e) {
    let value = e.target.value;

    if (!value) {
      this.setState({ searching: false });
      return this.handlePageChange(1);
    }

    let result = this.state.products.filter(
      product => product.name.indexOf(value) >= 0,
    );

    this.setState({ visibleProducts: result, searching: true });
  }

  handleClickOnProduct(product) {
    this.setState({ product: product || {}, form: product || {} });
  }

  handleFormSubmit(e, data) {
    e.preventDefault();
    console.log(data);
  }

  handleFormChanges(e) {
    let form = this.state.form;
    let product = this.state.product;
    let update = { [e.target.name]: e.target.value };

    if (!form.id && product && product.id) update.id = product.id;

    this.setState({
      form: Object.assign({}, form, update),
    });
  }

  dismissForm() {
    this.setState({ form: {}, product: null });
  }

  render() {
    const { fetching, error } = { ...this.props };
    const {
      visibleProducts,
      categories,
      searching,
      products,
      product,
      brands,
      form,
    } = {
      ...this.state,
    };

    return fetching ? (
      <div>fetching ...</div>
    ) : (
      <div>
        <div className="container mx-auto p-4" style={{ marginBottom: "40px" }}>
          {visibleProducts && (
            <React.Fragment>
              <h2 className="mb-4">Products ({products.length})</h2>

              <div className="md:flex">
                <button
                  onClick={_ => this.handleClickOnProduct(null)}
                  className="border border-green hover:bg-green-light text-green hover:text-white font-bold py-2 px-8 rounded mb-3 md:mr-2 w-full md:w-1/3"
                >
                  Create a new product
                </button>

                <SearchBar
                  onChange={this.handleSearch}
                  className="mb-3 w-full"
                />
              </div>

              {product && (
                <Modal
                  submit={e => this.handleFormSubmit(e, form)}
                  update={this.handleFormChanges}
                  allCategories={categories}
                  close={this.dismissForm}
                  brands={brands}
                  data={product}
                />
              )}

              <div className="flex flex-wrap -mx-2">
                {visibleProducts.map(product => {
                  return (
                    <Product
                      onClick={_ => this.handleClickOnProduct(product)}
                      key={product.id}
                      data={product}
                    />
                  );
                })}
              </div>

              {!searching && (
                <div
                  className="z-50 text-center fixed pin-b pin-l pin-r"
                  style={{ zIndex: "auto" }}
                >
                  <Pagination
                    itemsCountPerPage={this.state.perPage}
                    activePage={this.state.activePage}
                    totalItemsCount={products.length}
                    onChange={this.handlePageChange}
                    activeLinkClass="active"
                    pageRangeDisplayed={4}
                    hideDisabled
                  />
                </div>
              )}
            </React.Fragment>
          )}

          {error && (
            <Error reload={_ => window.location.reload()} description={error} />
          )}
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
