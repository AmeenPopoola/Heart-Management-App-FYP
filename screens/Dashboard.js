import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import WelcomeHeader from '../components/home-page-setup/WelcomeHeader';
import { CircularProgress } from 'react-native-circular-progress';

const Dashboard = () => {
  const navigation = useNavigation();

  // Dummy data for progress (example: 4 out of 10 tasks completed)
  const dailyTasksCompleted = 2;
  const totalDailyTasks = 3;

  const progress = (dailyTasksCompleted / totalDailyTasks) * 100; // Calculate progress percentage

  const handleCompleteDailyTasks = () => {
    navigation.navigate('DailyTasks'); // Navigate to the DailyTasks screen when the button is pressed
  };

  return (
    <ScrollView style={styles.container}>
      <WelcomeHeader />
      <View style={styles.progressContainer}>
        <CircularProgress
          size={200}
          width={10}
          fill={(progress / 100) * 100}
          tintColor="#007BFF"
          backgroundColor="#e6e6e6">
          {
            (fill) => (
              <Text style={styles.progressText}>{Math.round((fill / 100) * totalDailyTasks)}/{totalDailyTasks} tasks completed</Text>
            )
          }
        </CircularProgress>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleCompleteDailyTasks}
      >
        <Text style={styles.buttonText}>
          Complete Daily Tasks
        </Text>
      </TouchableOpacity>
      <Text style={styles.header}>
        Latest Trends
      </Text>
    </ScrollView>
  );
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: 'white', // Set background color to white
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'PTSerif_400Regular',
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
  header:{
    marginTop: 15,
    color: 'black',
    fontFamily : 'PTSerif_700Bold',
    fontSize: 20,
  }
};

export default Dashboard;
