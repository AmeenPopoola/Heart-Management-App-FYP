import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFonts,PTSerif_400Regular_Italic,PTSerif_400Regular,PTSerif_700Bold} from '@expo-google-fonts/pt-serif';
import { lightThemeStyles,darkThemeStyles } from '../styles/BloodPressure/bPStyles';
import { lightThemeButtonStyles,darkThemeButtonStyles } from '../styles/buttonStyles';


const BloodPressure = ({ navigation }) => {
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [age, setAge] = useState('');
    const [bpRecords, setBpRecords] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);


    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedAge = await AsyncStorage.getItem('age');
                const storedTheme = await AsyncStorage.getItem('themeState');
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
            // Retrieve existing records from AsyncStorage
            const storedRecords = await AsyncStorage.getItem('bpRecords');
            let updatedRecords = [];

            if (storedRecords) {
                // Parse existing records
                updatedRecords = JSON.parse(storedRecords);
            }

            // Add the new record to the beginning of the records array
            updatedRecords.unshift(newRecord);

            // Store the updated records back to AsyncStorage
            await AsyncStorage.setItem('bpRecords', JSON.stringify(updatedRecords));

            // Update the state with the new records
            setBpRecords(updatedRecords);
        } catch (error) {
            console.error('Error saving blood pressure records:', error);
        }
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
        <View style={styles.pageContainer}>
        <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="back" size={24} color={styles.backButtonText.color} />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            <View style={styles.contentContainer}>
                <Text style={styles.dateTime}>{currentDateTime}</Text>
                <Text style={styles.note}>You can perform blood pressure tests at home using your own blood pressure monitor.</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Systolic Pressure(mmHg)"
                    keyboardType="numeric"
                    value={systolic}
                    onChangeText={text => setSystolic(text)}
                    placeholderTextColor={styles.placeholderText.color}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Diastolic Pressure(mmHg)"
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
        </View>
    );
};


export default BloodPressure;