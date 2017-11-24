import "../../../jQueryHack";
import "signalr";
import "../../../tflHubs";

export const PREDICTIONS_REQUESTED = 'counter/PREDICTIONS_REQUESTED'
export const UPDATE_PREDICTIONS = 'counter/UPDATE_PREDICTIONS'

const $ = window.jQuery;

$.connection.hub.url = "https://push-api.tfl.gov.uk/signalr/hubs/signalr";

const hub = $.connection.predictionsRoomHub;

const toLowerFirst = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export const requestStopPredictions = (naptanId) => {
  return (dispatch) => {
    const appId = process.env.REACT_APP_TFL_APP_ID;
    const appKey = process.env.REACT_APP_TFL_APP_KEY;
    const url = `https://api.tfl.gov.uk/StopPoint/${naptanId}/Arrivals?mode=bus&app_id=${appId}&app_key=${appKey}`;

    // Push notification callback
    hub.client.showPredictions = predictions => {
      console.log("🚌 New predictions @", new Date().toTimeString());
      console.table(predictions, ["LineName", "VehicleId", "DestinationName", "ExpectedArrival", "TimeToLive", "Id"]);

      const transformedPredictions = predictions.map((p) => {
        return Object.keys(p).reduce((acc, key) => {
          acc[toLowerFirst(key)] = p[key];
          return acc;
        }, {})
      });

      dispatch({
        type: UPDATE_PREDICTIONS,
        predictions: transformedPredictions,
      });
    }

    dispatch({
      type: PREDICTIONS_REQUESTED
    });

    return fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        $.connection.hub.start().done(() => {
          const lineRooms = [{ "NaptanId": naptanId }];
          console.log("Registering for updates: " + naptanId);
          hub.server.addLineRooms(lineRooms)
        });

        return dispatch({
          type: UPDATE_PREDICTIONS,
          predictions: json,
        });
      }).catch(function(err) {
        console.log("Error fetching stop predictions:", err);
      });
  };
};
