export const PREDICTIONS_REQUESTED = 'counter/PREDICTIONS_REQUESTED'
export const UPDATE_PREDICTIONS = 'counter/UPDATE_PREDICTIONS'

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

export const requestStopPredictions = () => {
  return (dispatch) => {
    const naptanId = "490000014A";
    const appId = "<API_ID>";
    const appKey = "<API_KEY>";
    const url = `https://api.tfl.gov.uk/StopPoint/${naptanId}/Arrivals?mode=bus&app_id=${appId}&app_key=${appKey}`;

    dispatch({
      type: PREDICTIONS_REQUESTED
    });

    return fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        return dispatch({
          type: UPDATE_PREDICTIONS,
          predictions: json,
        });
      }).catch(function(err) {
        console.log("Error fetching stop predictions:", err);
      });
  };
};
