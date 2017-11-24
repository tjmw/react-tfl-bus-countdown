import React from 'react'

export default (props) => {
  const { prediction } = props;

  return (
    <tr data-ttl={prediction.timeToLive} data-vehicle-id={prediction.vehicleId}>
      <td className="prediction-route-number">{prediction.lineName}</td>
      <td className="prediction-destination">{prediction.destinationName}</td>
      <td className="prediction-time">{formatTime(prediction.timeToStation)}</td>
    </tr>
  )
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);

  if (minutes == 0) {
    return "due";
  } else if (minutes == 1) {
    return `${minutes} min`;
  } else {
    return `${minutes} mins`;
  }
};
