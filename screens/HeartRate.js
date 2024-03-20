import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import TextInputWithLabel from '../components/user-setup-process/UserInfoSetup/TextInputWithLabel';
import ButtonStyles from '../styles/buttonStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import { useHeartRateViewModel } from '../ViewModels/useHeartRateViewModel';


const HeartRate = () => {
  const { heartRate, setHeartRate, userAge, currentDate, handleEnterHeartRate } = useHeartRateViewModel();
  
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({ PTSerif_400Regular, PTSerif_700Bold });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="back" size={24} color="black" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.currentDate}>{currentDate}</Text>
      <TextInputWithLabel 
        label="Heart Rate"
        value={heartRate}
        placeholder="Enter your heart rate(bpm)"
        keyboardType="numeric"
        onChangeText={setHeartRate}
      />
      <TouchableOpacity
        style={ButtonStyles.button}
        onPress={handleEnterHeartRate}
      >
        <Text style={ButtonStyles.buttonText}>Enter Heart Rate</Text>
      </TouchableOpacity>
      <Video
        source={require('../assets/videos/HeartRateInstructions.mp4')} // Replace with the actual video URI
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.video}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backButtonText: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
    marginLeft: 5,
  },
  video: {
    width: 200,
    height: 200, // Adjust the height as needed
  },
  currentDate: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  }
});

export default HeartRate;