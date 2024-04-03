import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,Linking,ScrollView } from 'react-native';
import Heart from 'react-native-vector-icons/FontAwesome';
import Blood from 'react-native-vector-icons/Fontisto';
import Health from 'react-native-vector-icons/MaterialIcons';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import { lightThemeStyles,darkThemeStyles } from '../styles/Tips/tipsStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tips = () => {

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

  let [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;
  



  const handleCardPressHROne = () => {
    Linking.openURL('https://www2.hse.ie/conditions/atrial-fibrillation/');
  };

  const handleCardPressBPOne = () => {
    Linking.openURL('https://www2.hse.ie/conditions/high-blood-pressure-hypertension/');
  };

  const handleCardPressBPTwo = () => {
    Linking.openURL('https://irishheart.ie/how-to-keep-your-heart-healthy/blood-pressure/?gad_source=1&gclid=Cj0KCQjw2a6wBhCVARIsABPeH1v7MdGs1Q4RQZMAwnYErdV1uXRtgmNF2RvXG-NB3xLYu1qfWOsbatIaAgqSEALw_wcB');
  };

  const handleCardPressHPTwo = () => {
    Linking.openURL('https://www2.hse.ie/conditions/coronary-heart-disease-chd/prevention/');
  };

  const handleCardPressHPThree = () => {
    Linking.openURL('https://irishheart.ie/real-life-stories/');
  };

  const handleCardPressOne = () => {
    Linking.openURL('https://irishheart.ie/how-to-keep-your-heart-healthy/recipes/?tag=in-season#recipe-list');
  };

  const handleCardPressTwo = () => {
    Linking.openURL('https://www2.hse.ie/living-well/exercise/increase-activity/');
  };

  const handleCardPressBPThree = () => {
    Linking.openURL('https://www.healthline.com/health/high-blood-pressure-hypertension/lower-it-fast');
  };






  return (
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Heart Tips</Text>
        <View style={styles.greyContainer}>
        <TouchableOpacity style={styles.card} onPress={handleCardPressHROne}>
          <Heart name="heartbeat" size={30} color="red" style={styles.cardIcon} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Atrial Fibrillation - HSE</Text>
            <Text style={styles.cardDescription}>Learn more about irregular heart rhythm from the HSE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleCardPressHPTwo}>
        <Heart name="heartbeat" size={30} color="red" style={styles.cardIcon} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Preventing Heart Disease</Text>
            <Text style={styles.cardDescription}>Learn more about monitoring your heart rate</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleCardPressHPThree}>
        <Heart name="heartbeat" size={30} color="red" style={styles.cardIcon} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Real Life Stories</Text>
            <Text style={styles.cardDescription}>Stories from People Who Have Been Affected By Heart Issues</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Blood Pressure Tips</Text>
        <View style={styles.greyContainer}>
        <TouchableOpacity style={styles.card} onPress={handleCardPressBPOne}>
        <Blood name="blood-drop" size={30} color="red" style={styles.cardIcon} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Blood Pressure - HSE</Text>
            <Text style={styles.cardDescription}>Learn more about High Blood Pressure from the HSE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleCardPressBPTwo}>
        <Blood name="blood-drop" size={30} color="red" style={styles.cardIcon} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Controlling Blood Pressure</Text>
            <Text style={styles.cardDescription}>Information on How to Control Your Blood Pressure</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleCardPressBPThree}>
        <Blood name="blood-drop" size={30} color="red" style={styles.cardIcon} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Ways To Lower Blood Pressure</Text>
            <Text style={styles.cardDescription}>Learn Different Effecient Ways To Lower Blood Pressure</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>


      <View style={styles.section}>
        <Text style={styles.header}>Other Tips</Text>
        <View style={styles.greyContainer}>
        <TouchableOpacity style={styles.card} onPress={handleCardPressOne}>
        <Health name="health-and-safety" size={30} color="red" style={styles.cardIcon} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Recipes For Healthy Foods</Text>
            <Text style={styles.cardDescription}>Recommeded Recipes From Irish Heart Foundation to Maintain Good Heart Health</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleCardPressTwo}>
        <Health name="health-and-safety" size={30} color="red" style={styles.cardIcon} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Becoming More Active</Text>
            <Text style={styles.cardDescription}>How to Increase Your Activity Levels</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column', // Arrange children vertically
    marginTop:20,
  },
  section: {
    flex: 1, // Each section occupies equal space
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  greyContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    width: '85%',
    marginBottom:10,
  },
  card: {
    backgroundColor: '#f5f5f5', // Lighter grey background
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  cardIcon: {
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default Tips;