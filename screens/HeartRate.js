import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import TextInputWithLabel from "../components/user-setup-process/UserInfoSetup/TextInputWithLabel"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TouchableOpacity } from 'react-native';
import ButtonStyles from '../styles/buttonStyles';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Video } from 'expo-av';

const HeartRate = () => {

const navigation = useNavigation();

 const[heartRate,setHeartRate] = useState('');
 const [userAge, setAge] = useState('');
 const [currentDate, setCurrentDate] = useState('');

 useEffect(() => {
  const loadUserData = async () => {
    try {
      const storedAge = await AsyncStorage.getItem('age');
      
        if (storedAge) setAge(storedAge);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };
  loadUserData();
},[]);

useEffect(() => {
  const updateCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${date.toDateString()} ${date.toLocaleTimeString()}`;
    setCurrentDate(formattedDate);
  };

  // Update the current date initially
  updateCurrentDate();

  // Set up an interval to update the current date every minute
  const intervalId = setInterval(updateCurrentDate, 60000);

  // Clear the interval on component unmount
  return () => clearInterval(intervalId);
}, []);

const handleEnterHeartRate = () => {
  // Check if the entered value is a number
  const enteredBPM = parseInt(heartRate, 10);
  if (isNaN(enteredBPM)) {
    Alert.alert('Error', 'Please enter a valid number for Heart Rate.');
    return;
  }

  // Determine the band width based on user's age
  let lowerLimit, upperLimit;
  if (userAge >= 5 && userAge <= 6) {
    lowerLimit = 75;
    upperLimit = 115;
  } else if (userAge >= 7 && userAge <= 9) {
    lowerLimit = 70;
    upperLimit = 110;
  } else if (userAge >= 10) {
    lowerLimit = 60;
    upperLimit = 100;
  } else {
    Alert.alert('Error', 'Please enter a valid age.');
    return;
  }

  // Check if entered BPM is within the band width
  const currentDate = new Date();
  const timestamp = currentDate.toISOString();

  // Check if entered BPM is within the band width
  if (enteredBPM >= lowerLimit && enteredBPM <= upperLimit) {
    const resultData = {
      heartRate: enteredBPM,
      isWithinRange: true,
      timestamp: timestamp,
    };


    saveResultData(resultData);

    Alert.alert('Success', 'Entered Heart Rate is within the band width!');
  } else {
    const resultData = {
      heartRate : enteredBPM,
      isWithinRange: false,
      timestamp: timestamp,
    };

    saveResultData(resultData);

    Alert.alert('Error', 'Entered Heart Rate is outside the allowed range for the given age.');
  }
};


const saveResultData = async (data) => {
  try {
    const storedResults = await AsyncStorage.getItem('heartRateResults');
    const results = storedResults ? JSON.parse(storedResults) : [];

    results.push(data);

    await AsyncStorage.setItem('heartRateResults', JSON.stringify(results));
  } catch (error) {
    console.error('Error saving heart rate result to AsyncStorage:', error);
  }
};


let [fontsLoaded] = useFonts({
  PTSerif_400Regular,
  PTSerif_700Bold,
});

if (!fontsLoaded) {
  return null;
}


return( 
<View style = {styles.container}>
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
       value = {heartRate}
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

)
}

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
      top: 20,
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