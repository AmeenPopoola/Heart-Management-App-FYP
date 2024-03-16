import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,ScrollView, Button } from 'react-native';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import WelcomeHeader from '../components/home-page-setup/WelcomeHeader';

const Dashboard = () => {

const navigation = useNavigation();

const handleEnterHeartRate = () => {
  navigation.navigate('HeartRate');
};

  return (
  <ScrollView style={styles.container}>
    <WelcomeHeader/>
    <TouchableOpacity
        style={styles.button}
        onPress={handleEnterHeartRate}
      >
        <Text style={styles.buttonText}>
          Enter Heart Rate
        </Text>
        </TouchableOpacity>
        <Button
         title='Go to Reminder'
         onPress={() => navigation.navigate("Reminder")}
          />
    </ScrollView>
  );
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: 'white', // Set background color to white
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
  },
};

export default Dashboard;
