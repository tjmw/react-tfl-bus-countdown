import React from 'react'

export default (props) => {
  const { prediction } = props;

  return (
    <tr data-ttl={prediction.timeToLive} data-vehicle-id={prediction.vehicleId}>
      <td className="prediction-route-number">{prediction.lineName}</td>
      <td className="prediction-destination">{prediction.destinationName}</td>
      <td className="prediction-time">{prediction.timeToStation}</td>
    </tr>
  )
}
