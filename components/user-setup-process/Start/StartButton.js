import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const StartButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.startButton} onPress={onPress}>
      <Text style={styles.startButtonText}>Let's Start</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  startButton: {
    backgroundColor: '#000000',
    padding: 20,
    borderRadius: 5,
    width: '95%',
    position: 'absolute',
    bottom: '15%',
  },
  startButtonText: {
    fontSize: 18,
    fontFamily: 'PTSerif_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default StartButton;