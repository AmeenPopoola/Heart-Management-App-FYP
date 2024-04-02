import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Image,FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { lightThemeButtonStyles,darkThemeButtonStyles } from '../styles/buttonStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import { darkThemeStyles,lightThemeStyles } from '../styles/Profile/profileStyles';


const Profile = () => {
  const [userFirstName, setUserFirstName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('firstName');
        const storedAge = await AsyncStorage.getItem('age');
        const storedGender = await AsyncStorage.getItem('gender');
        const storedHeight = await AsyncStorage.getItem('height');
        const storedWeight = await AsyncStorage.getItem('weight');
        const storedTheme = await AsyncStorage.getItem('themeState');
        const emergencyContacts = await AsyncStorage.getItem('emergencyContacts');

        if (storedFirstName) setUserFirstName(storedFirstName);
        if (storedAge) setAge(storedAge);
        if (storedGender) setGender(storedGender);
        if (storedHeight) setHeight(storedHeight);
        if (storedWeight) setWeight(storedWeight);
        if (emergencyContacts) setEmergencyContacts(JSON.parse(emergencyContacts));
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


  const handleEditProfile = () => {
    // Navigate to the Setup screen
    navigation.navigate('Setup');
  };

  let [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

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
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Your Profile</Text>
        </View>
      </View>

      {/* Conditionally render male or female image */}
      <View style={styles.imageContainer}>
        {gender === 'Male' ? (
          <Image source={require('../assets/images/maleImage.png')} style={styles.profileImage} />
        ) : (
          <Image source={require('../assets/images/femaleImage.png')} style={styles.profileImage} />
        )}
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.profileInfoItem}>
          <Text style={styles.profileInfoTitle}>Name:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.profileInfoText}>{userFirstName}</Text>
          </View>
        </View>
        <View style={styles.profileInfoItem}>
          <Text style={styles.profileInfoTitle}>Age:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.profileInfoText}>{age}</Text>
          </View>
        </View>
        <View style={styles.profileInfoItem}>
          <Text style={styles.profileInfoTitle}>Gender:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.profileInfoText}>{gender}</Text>
          </View>
        </View>
        <View style={styles.profileInfoItem}>
          <Text style={styles.profileInfoTitle}>Height:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.profileInfoText}>{height} cm</Text>
          </View>
        </View>
        <View style={styles.profileInfoItem}>
          <Text style={styles.profileInfoTitle}>Weight:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.profileInfoText}>{weight} kg</Text>
          </View>
        </View>
      </View>

      <View style={styles.emergencyContacts}>
        <Text style={styles.emergencyHeading}>Emergency Contacts:</Text>
        <FlatList
          data={emergencyContacts}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.contactInfo}>
              <Text style={styles.profileInfoText}>Name: {item.name}</Text>
              <Text style={styles.profileInfoText}>Number: {item.number}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <TouchableOpacity style={ButtonStyles.button} onPress={handleEditProfile}>
        <Text style={ButtonStyles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Profile;