import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeHeader() {
  const [userFirstName, setUserFirstName] = useState('');

  const navigation = useNavigation();

  const handleSettingsPress = () => {
    navigation.navigate('Settings'); 
  };

  const [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('firstName');
        if (storedFirstName) {
          setUserFirstName(storedFirstName);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 20, fontFamily: 'PTSerif_700Bold' }}>Hello,</Text>
        <Text style={{ fontSize: 24, fontFamily: 'PTSerif_700Bold' }}>{userFirstName}</Text>
      </View>
      <TouchableOpacity  onPress={handleSettingsPress}>
        <Icon name="setting" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  }
});