import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestStopPredictions } from "../../redux/modules/predictions/actions";
import Prediction from './prediction';

class Stop extends Component {
  componentDidMount() {
    const { naptanId } = this.props;

    this.props.requestStopPredictions(naptanId);
  }

  render() {
    const { predictions } = this.props;

    if (predictions && predictions.length > 0) {
      return this.renderPredictions();
    } else {
      return this.renderEmpty();
    }
  }

  renderEmpty() {
    return (
      <div>No predicted arrivals</div>
    );
  }

  renderPredictions() {
    const { predictions } = this.props;

    return (
      <div>
        <table className="pure-table pure-table-horizontal">
          <tbody>
            {predictions.map((prediction) =>
              <Prediction key={prediction.id} prediction={prediction} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    naptanId: ownProps.match.params.naptanId,
    predictions: state.predictions.predictions
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      requestStopPredictions
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Stop);
