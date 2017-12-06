import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default (props) => {
  const { prediction } = props;

  return (
    <View style={styles.row}>
      <View style={styles.line}>
        <Text>{prediction.lineName}</Text>
      </View>
      <View style={styles.destination}>
        <Text>{prediction.destinationName}</Text>
      </View>
      <View style={styles.time}>
        <Text>{formatTime(prediction.timeToStation)}</Text>
      </View>
    </View>
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

const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row' 
  },
  line: {
    flex: 1,
    flexGrow: 1,
  },
  destination: {
    flex: 1,
    flexGrow: 2,
  },
  time: {
    flex: 1,
    flexGrow: 1,
  }
});
