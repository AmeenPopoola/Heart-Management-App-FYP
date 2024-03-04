import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,ScrollView } from 'react-native';
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
  <ScrollView style={{padding:20}}>
    <WelcomeHeader/>
    <TouchableOpacity
        style={{
          backgroundColor: '#007BFF',
          padding: 15,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={handleEnterHeartRate}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'PTSerif_400Regular', fontSize: 16 }}>
          Enter Heart Rate
        </Text>
        </TouchableOpacity>
    </ScrollView>
  );
};

export default Dashboard;
