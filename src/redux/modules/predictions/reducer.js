import { PREDICTIONS_REQUESTED, UPDATE_PREDICTIONS } from "./actions";

const initialState = {
  predictions: [],
  isFetchingPredictions: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PREDICTIONS_REQUESTED:
      return {
        ...state,
        isFetchingPredictions: true
      }

    case UPDATE_PREDICTIONS:
      return {
        ...state,
        isFetchingPredictions: false,
        predictions: action.predictions
      }

    default:
      return state
  }
}
