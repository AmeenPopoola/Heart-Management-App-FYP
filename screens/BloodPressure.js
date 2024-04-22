import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Video } from 'expo-av';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold, PTSerif_400Regular_Italic } from '@expo-google-fonts/pt-serif';
import useBloodPressureViewModel from '../ViewModels/useBloodPressureViewModel';
import { lightThemeStyles, darkThemeStyles } from '../styles/BloodPressure/bPStyles';
import { lightThemeButtonStyles, darkThemeButtonStyles } from '../styles/buttonStyles';

const BloodPressure = ({ navigation }) => {
  const {
    systolic,
    setSystolic,
    diastolic,
    setDiastolic,
    age,
    setAge,
    bpRecords,
    setBpRecords,
    currentDateTime,
    isDarkMode,
    setIsDarkMode,
    uid,
    setUid,
    isLoggedIn,
    setIsLoggedIn,
    isPlaying,
    setIsPlaying,
    videoRef,
    handleCalculateBP,
    togglePlayPause
  } = useBloodPressureViewModel();

  const [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
    PTSerif_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;
  const ButtonStyles = isDarkMode ? darkThemeButtonStyles : lightThemeButtonStyles;

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="back" size={24} color={styles.backButtonText.color} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.videoContainer}>
        <Text style={styles.heading}>How To Take Your Blood Pressure</Text>
        <TouchableOpacity onPress={togglePlayPause}>
          <Video
            ref={videoRef}
            source={require('../assets/videos/BloodPressureInstructions.mp4')} // Replace with the actual video URI
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={isPlaying} // Control playing status
            isLooping
            style={styles.video}
            positionMillis={83000}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.dateTime}>{currentDateTime}</Text>
        <Text style={styles.note}>You can perform blood pressure tests at home using your own blood pressure monitor.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Systolic Pressure (mmHg)"
          keyboardType="numeric"
          value={systolic}
          onChangeText={text => setSystolic(text)}
          placeholderTextColor={styles.placeholderText.color}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Diastolic Pressure (mmHg)"
          keyboardType="numeric"
          value={diastolic}
          onChangeText={text => setDiastolic(text)}
          placeholderTextColor={styles.placeholderText.color}
        />
        <TouchableOpacity
          style={[ButtonStyles.button, styles.button]} // Apply both buttonStyles and styles
          onPress={handleCalculateBP}
        >
          <Text style={[ButtonStyles.buttonText, styles.buttonText]}>Enter Blood Pressure</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BloodPressure;