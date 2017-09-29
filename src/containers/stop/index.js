import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestStopPredictions } from "../../modules/stop";

class Stop extends Component {
  componentDidMount() {
    this.props.requestStopPredictions();
  }

  render() {
    return (
      <div>
        <h1>Stop page</h1>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestStopPredictions
    },
    dispatch
  );

const wrapped = connect(null, mapDispatchToProps)(Stop);

export default wrapped;
