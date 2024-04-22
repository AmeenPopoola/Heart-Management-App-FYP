import React, {useState,useEffect} from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Map from 'react-native-vector-icons/Entypo';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { lightThemeStyles,darkThemeStyles } from '../styles/Emergency/emergencyStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Emergency = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const isFocused = useIsFocused();

  const navigation = useNavigation();

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
  }, [isDarkMode,isFocused]);

  const handleCallEmergencyServices = () => {
    Linking.openURL('tel:999');
  };

  const handleDefibMap = () => {
    navigation.navigate('DefibLocation');
  };

  
  const handleContacts = () => {
    navigation.navigate('ContactView');
  };

  const [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });
  
  if (!fontsLoaded) {
    return null;
  }

  const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <TouchableOpacity style={styles.iconContainer} onPress = {handleDefibMap}>
            <View style={styles.iconBackground}>
              <Map name="map" size={24} color="white"/>
            </View>
            <Text style={styles.cardText}>Defibrillator Map</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.iconContainer} onPress ={handleContacts}>
            <View style={styles.iconBackground}>
              <Icon name="contacts" size={24} color="white" />
            </View>
            <Text style={styles.cardText}>View Emergency Contacts</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.iconContainer} onPress={handleCallEmergencyServices}>
            <View style={styles.iconBackground}>
              <Icon name="phone" size={24} color="white" />
            </View>
            <Text style={styles.cardText}>Call Emergency Services</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default Emergency;