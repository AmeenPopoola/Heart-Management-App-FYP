import React, { useState, useRef,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import TextInputWithLabel from '../components/user-setup-process/UserInfoSetup/TextInputWithLabel';
import ButtonStyles from '../styles/buttonStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import { useHeartRateViewModel } from '../ViewModels/useHeartRateViewModel';
import { darkThemeButtonStyles,lightThemeButtonStyles } from '../styles/buttonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeartRate = () => {
  const { heartRate, setHeartRate, userAge, currentDate, handleEnterHeartRate } = useHeartRateViewModel();
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // State to manage video playing/pausing
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const ButtonStyles = isDarkMode ? darkThemeButtonStyles : lightThemeButtonStyles;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="back" size={24} color="black" />
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
            <TouchableOpacity style={ButtonStyles.button} onPress={startTimer}>
              <Text style={ButtonStyles.buttonText}>Start Timer</Text>
            </TouchableOpacity>
          )}
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
    marginLeft: 5,
  },
  currentDate: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
    marginLeft: 10,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, // Add padding to prevent content from being covered by the back button when scrolling
  },
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
  },
  video: {
    width: 300,
    height: 200, // Adjust the height as needed
  },
  timer: {
    fontFamily: 'PTSerif_700Bold',
    fontSize: 20,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  instructionBox: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  instructionText: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 14,
    textAlign: 'left',
  },
});

export default HeartRate;