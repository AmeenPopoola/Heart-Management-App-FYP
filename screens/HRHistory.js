import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { lightThemeStyles,darkThemeStyles } from '../styles/HeartRate/hRHistoryStyles';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HRHistory = () => {
  const navigation = useNavigation();
  const [heartRateHistory, setHeartRateHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });

  useEffect(() => {
    const fetchHeartRateHistory = async () => {
      try {
        const storedData = await AsyncStorage.getItem('heartRateResults');
        const storedTheme = await AsyncStorage.getItem('themeState');
        if (storedTheme !== null) {
          const parsedTheme = JSON.parse(storedTheme);
          setIsDarkMode(parsedTheme);
        }
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setHeartRateHistory(parsedData);
        }
      } catch (error) {
        console.error('Error fetching heart rate history:', error);
      }
    };

    fetchHeartRateHistory();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;


  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="back" size={24} color={styles.backButtonText.color} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Heart Rate History</Text>
      <Text style={styles.listHeader}>BPM                      Date</Text>
      <FlatList
        data={heartRateHistory}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.heartRate} bpm</Text>
            <Text style={styles.itemText}>{new Date(item.timestamp).toLocaleString()}</Text>
            <View style={[styles.square, { backgroundColor: item.isWithinRange ? 'green' : 'red' }]} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default HRHistory;