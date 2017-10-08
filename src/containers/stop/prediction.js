import React from 'react'

export default (props) => {
  const { prediction } = props;

  return (
    <ul>
      <span>{prediction.lineName}</span>
      <span>{prediction.destinationName}</span>
      <span>{prediction.timeToStation}</span>
    </ul>
  )
}
