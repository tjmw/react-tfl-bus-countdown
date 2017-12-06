import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestStopPredictions } from "../../redux/modules/predictions/actions";
import Prediction from './prediction';
import { View, Text, StyleSheet } from 'react-native'

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
      <View>
        <Text>No predicted arrivals</Text>
      </View>
    );
  }

  renderPredictions() {
    const { predictions } = this.props;

    return (
      <View>
        {predictions
            .sort((p1, p2) => p1.timeToStation - p2.timeToStation)
            .map((prediction) => <Prediction key={prediction.id} prediction={prediction} />)
        }
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    naptanId: ownProps.match.params.naptanId,
    predictions: state.predictions.predictions
  }
}

const styles = StyleSheet.create({
  table: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      requestStopPredictions
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Stop);
