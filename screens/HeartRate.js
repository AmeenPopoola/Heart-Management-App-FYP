import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import TextInputWithLabel from "../components/user-setup-process/UserInfoSetup/TextInputWithLabel"
import AsyncStorage from "@react-native-async-storage/async-storage"
import YoutubeIframe from 'react-native-youtube-iframe';
import { TouchableOpacity } from 'react-native';
import ButtonStyles from '../styles/buttonStyles';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';

const HeartRate = () => {
 const[heartRate,setHeartRate] = useState('');
 const [userAge, setAge] = useState('');

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
  if (enteredBPM >= lowerLimit && enteredBPM <= upperLimit) {
    Alert.alert('Success', 'Entered Heart Rate is within the band width!');
  } else {
    Alert.alert('Error', 'Entered Heart Rate is outside the allowed range for the given age.');
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
    </View>

)
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    video: {
      width: 200,
      height: 200, // Adjust the height as needed
    },
  });

export default HeartRate;