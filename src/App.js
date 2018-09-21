import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions";

class App extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <div>
        <div className="container mx-auto p-4" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetching: state.fetching,
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
