export const PREDICTIONS_REQUESTED = 'counter/PREDICTIONS_REQUESTED'
export const UPDATE_PREDICTIONS = 'counter/UPDATE_PREDICTIONS'

export const requestStopPredictions = () => {
  return (dispatch) => {
    const naptanId = "490000014A";
    const appId = "XXX";
    const appKey = "XXX";
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
