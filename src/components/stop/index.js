import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestStopPredictions } from "../../redux/modules/predictions/actions";
import Prediction from './prediction';

class Stop extends Component {
  componentDidMount() {
    this.props.requestStopPredictions();
  }

  render() {
    const { predictions } = this.props;

    return (
      <div>
        <h1>Stop page</h1>
        <ul>
          {predictions && predictions.map((prediction) =>
            <Prediction key={prediction.id} prediction={prediction} />
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { predictions: state.predictions.predictions }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestStopPredictions
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Stop);
