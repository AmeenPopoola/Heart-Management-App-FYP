import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity,Linking } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Map from 'react-native-vector-icons/Entypo';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import { useNavigation } from '@react-navigation/native';

const Emergency = () => {

  const navigation = useNavigation();

  const handleCallEmergencyServices = () => {
    Linking.openURL('tel:999');
  };

  const handleDefibMap = () => {
    // Navigate to the defibrillator map screen
    navigation.navigate('DefibLocation');
  };

  
  const handleContacts = () => {
    // Navigate to the defibrillator map screen
    navigation.navigate('ContactView');
  };

  const [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });
  
  if (!fontsLoaded) {
    return null;
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop:20,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconBackground: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardText: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});

export default Emergency;