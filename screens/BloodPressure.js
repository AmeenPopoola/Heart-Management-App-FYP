import React, { useState, useEffect, useRef } from 'react';
import { Video } from 'expo-av';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFonts,PTSerif_400Regular_Italic,PTSerif_400Regular,PTSerif_700Bold} from '@expo-google-fonts/pt-serif';
import { lightThemeStyles,darkThemeStyles } from '../styles/BloodPressure/bPStyles';
import { lightThemeButtonStyles,darkThemeButtonStyles } from '../styles/buttonStyles';
import { db } from '../firebaseConfig'; 
import { doc, updateDoc,getDoc } from 'firebase/firestore';


const BloodPressure = ({ navigation }) => {
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [age, setAge] = useState('');
    const [bpRecords, setBpRecords] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [uid,setUid] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const videoRef = useRef(null);


    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedAge = await AsyncStorage.getItem('age');
                const storedTheme = await AsyncStorage.getItem('themeState');
                const storedUID = await AsyncStorage.getItem('uid');
                const userLoggedIn = await AsyncStorage.getItem('isLoggedIn');

                setIsLoggedIn(!!userLoggedIn);
                if(storedUID) setUid(storedUID);
                if (storedAge) {
                    setAge(storedAge);
                }
                if (storedTheme !== null) {
                    const parsedTheme = JSON.parse(storedTheme);
                    setIsDarkMode(parsedTheme);
                  };
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadUserData();
    }, []);

   useEffect(() => {
    const updateCurrentDate = () => {
        const date = new Date();
        const formattedDate = `${date.toDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        setCurrentDateTime(formattedDate);
    };
    
    const interval = setInterval(updateCurrentDate, 10000); // Update every second

    return () => clearInterval(interval);
}, []);

    const checkBloodPressureCategory = (systolic, diastolic) => {
        if (age >= 80) {
            if (parseInt(systolic) >= 150 || parseInt(diastolic) >= 90) {
                return "High Blood Pressure";
            } else if (parseInt(systolic) >= 145 || parseInt(diastolic) >= 85) {
                return "Ideal Blood Pressure";
            } else {
                return "Normal Blood Pressure";
            }
        } else {
            if (parseInt(systolic) >= 140 || parseInt(diastolic) >= 90) {
                return "High Blood Pressure";
            } else if (parseInt(systolic) >= 135 || parseInt(diastolic) >= 85) {
                return "Ideal Blood Pressure";
            } else {
                return "Normal Blood Pressure";
            }
        }
    };

    const handleCalculateBP = async () => {
        if (systolic && diastolic) {
            const category = checkBloodPressureCategory(systolic, diastolic);
            const time = new Date().toLocaleString();
            const newRecord = { systolic, diastolic, category, time };
    
            try {
                // Retrieve existing records from Firestore
                const userBPReadingsRef = doc(db, 'userBPReadings', uid);
                const userBPReadingsSnapshot = await getDoc(userBPReadingsRef);
                const existingBloodPressureData = userBPReadingsSnapshot.data().bloodPressureData || [];
    
                // Add the new record to the existing data
                const updatedBloodPressureData = [...existingBloodPressureData, newRecord];
    
                // Update the document with the updated data
                await updateDoc(userBPReadingsRef, {
                    bloodPressureData: updatedBloodPressureData,
                });
    
                navigation.navigate('BPResult', { resultData: newRecord });
            } catch (error) {
                console.error('Error saving blood pressure records:', error);
            }
        }
    };

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
        <ScrollView  contentContainerStyle={styles.pageContainer}>
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