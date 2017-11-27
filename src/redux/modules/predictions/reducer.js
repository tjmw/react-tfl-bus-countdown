import { PREDICTIONS_REQUESTED, UPDATE_PREDICTIONS } from "./actions";

const initialState = {
  predictions: [],
  isFetchingPredictions: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PREDICTIONS_REQUESTED:
      return {
        ...state,
        isFetchingPredictions: true
      };

    case UPDATE_PREDICTIONS:
      return {
        ...state,
        isFetchingPredictions: false,
        predictions: mergePredictions(state.predictions, action.predictions),
      };

    default:
      return state;
  }
};

const mergePredictions = (currentPreductions, newPredictions) => {
  const hashedCurrent = hashPredictionsByVehicleId(currentPreductions);
  const hashedNew = hashPredictionsByVehicleId(newPredictions);

  const merged = Object.assign({}, hashedCurrent, hashedNew);

  return Object.values(merged);
};

const hashPredictionsByVehicleId = (predictionsList) => {
  return predictionsList.reduce((acc, p) => {
    acc[p.vehicleId] = p;
    return acc;
  }, {});
};
