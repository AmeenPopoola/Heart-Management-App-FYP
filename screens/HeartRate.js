import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import TextInputWithLabel from '../components/user-setup-process/UserInfoSetup/TextInputWithLabel';
import { lightThemeStyles, darkThemeStyles } from '../styles/HeartRate/hRStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import { useHeartRateViewModel } from '../ViewModels/useHeartRateViewModel';
import { darkThemeButtonStyles, lightThemeButtonStyles } from '../styles/buttonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HeartRate = () => {
  const { heartRate, setHeartRate, userAge, currentDate, handleEnterHeartRate } = useHeartRateViewModel();
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // State to manage video playing/pausing
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to manage button disablement

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('themeState');
        if (storedTheme !== null) {
          const parsedTheme = JSON.parse(storedTheme);
          setIsDarkMode(parsedTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            clearInterval(interval); // Stop the timer when it reaches 0
            setIsTimerRunning(false);
            return 30;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // Clean up the interval on unmount
    }
  }, [isTimerRunning]);// Empty dependency array ensures that this effect runs only once on mount

  const startTimer = () => {
    setIsTimerRunning(true); // Start the timer
  };

  const handleButtonPress = async () => {
    // Disable the button to prevent multiple presses
    setIsButtonDisabled(true);

    try {
      await handleEnterHeartRate();
    } catch (error) {
      console.error('Error handling heart rate:', error);
    } finally {
      // Enable the button after handling the heart rate
      setIsButtonDisabled(false);
    }
  };

  let [fontsLoaded] = useFonts({ PTSerif_400Regular, PTSerif_700Bold });

  if (!fontsLoaded) {
    return null;
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;
  const ButtonStyles = isDarkMode ? darkThemeButtonStyles : lightThemeButtonStyles;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="back" size={24} color={styles.backButtonText.color} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.currentDate}>{currentDate}</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View style={styles.instructionBox}>
            <Text style={styles.instructionText}>
              To check your pulse:
              {"\n\n"}
              1. Sit down for 5 minutes. Do not smoke or drink caffeine before checking your pulse.
              {"\n\n"}
              2. Hold your left hand out with your palm facing up and elbow slightly bent.
              {"\n\n"}
              3. Firmly place your index and middle finger of your right hand on your left wrist, at the base of the thumb - between the wrist and the tendon attached to the thumb.
              {"\n\n"}
              4. Using the second hand on a clock or watch, count the number of beats for 30 seconds, and then double that number to get your heart rate in beats per minute.
            </Text>
            <View style={styles.videoContainer}>
              <TouchableOpacity onPress={togglePlayPause}>
                <Video
                  ref={videoRef}
                  source={require('../assets/videos/HeartRateInstructions.mp4')} // Replace with the actual video URI
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay={isPlaying} // Control playing status
                  isLooping
                  style={styles.video}
                  positionMillis={18000}
                />
              </TouchableOpacity>
            </View>
          </View>
          {isTimerRunning ? (
            <Text style={styles.timer}>{timer} seconds remaining</Text>
          ) : (
            <TouchableOpacity
              style={ButtonStyles.button}
              onPress={startTimer}
              disabled={isButtonDisabled} // Disable the button when the timer is not running
            >
              <Text style={ButtonStyles.buttonText}>Start Timer</Text>
            </TouchableOpacity>
          )}
          <TextInputWithLabel
            label="Heart Rate"
            value={heartRate}
            placeholder="Enter your heart rate(bpm)"
            keyboardType="numeric"
            onChangeText={setHeartRate}
            editable={!isButtonDisabled} // Disable editing when the button is disabled
          />
          <TouchableOpacity
            style={ButtonStyles.button}
            onPress={handleButtonPress}
            disabled={isButtonDisabled} // Disable the button when it's already pressed
          >
            <Text style={ButtonStyles.buttonText}>Enter Heart Rate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};


export default HeartRate;