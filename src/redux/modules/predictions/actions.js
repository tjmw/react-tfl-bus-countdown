import "../../../jQueryHack";
import "signalr";
import "../../../tflHubs";

export const PREDICTIONS_REQUESTED = 'PREDICTIONS_REQUESTED';
export const UPDATE_PREDICTIONS = 'UPDATE_PREDICTIONS';

const APP_ID = process.env.REACT_APP_TFL_APP_ID;
const APP_KEY = process.env.REACT_APP_TFL_APP_KEY;

const $ = window.jQuery;

$.connection.hub.url = "https://push-api.tfl.gov.uk/signalr/hubs/signalr";

const hub = $.connection.predictionsRoomHub;

const toLowerFirst = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

// The initial predictions fetch has camel case keys (lowercase first letter)
// but the realtime updates have uppercase first letters. Normalize here
// (shallow only).
const normalizePredictions = (predictions) => {
  return predictions.map((p) => {
    return Object.keys(p).reduce((acc, key) => {
      acc[toLowerFirst(key)] = p[key];
      return acc;
    }, {})
  });
}

export const requestStopPredictions = (naptanId) => {
  return (dispatch) => {
    dispatch({
      type: PREDICTIONS_REQUESTED
    });

    const url = `https://api.tfl.gov.uk/StopPoint/${naptanId}/Arrivals?mode=bus&app_id=${APP_ID}&app_key=${APP_KEY}`;

    return fetch(url)
      .then((response) => {
        return response.json();
      }).then((json) => {
        dispatch(subscribeToPredictions(naptanId));

        return dispatch({
          type: UPDATE_PREDICTIONS,
          predictions: json,
        });
      }).catch((err) => {
        console.log("Error fetching stop predictions:", err);
      });
  };
};

const subscribeToPredictions = (naptanId) => {
  return (dispatch) => {
    // Push notification callback
    hub.client.showPredictions = predictions => {
      console.log("🚌 New predictions @", new Date().toTimeString());
      console.table(predictions, ["LineName", "VehicleId", "DestinationName", "ExpectedArrival", "TimeToLive", "Id"]);

      const normalizedPredictions = normalizePredictions(predictions);

      dispatch({
        type: UPDATE_PREDICTIONS,
        predictions: normalizedPredictions,
      });
    }

    $.connection.hub.start().done(() => {
      const lineRooms = [{ "NaptanId": naptanId }];
      console.log("Registering for updates: " + naptanId);
      hub.server.addLineRooms(lineRooms)
    });
  };
};
