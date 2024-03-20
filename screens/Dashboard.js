import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import WelcomeHeader from '../components/home-page-setup/WelcomeHeader';
import { CircularProgress } from 'react-native-circular-progress';
import HeartRateGraph from '../components/heart-rate-info/HeartRateGraph';

const Dashboard = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [heartRateData, setHeartRateData] = useState([]);
  const [bloodPressureData, setBloodPressureData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const storedHeartRateData = await AsyncStorage.getItem('heartRateResults');
          const storedBloodPressureData = await AsyncStorage.getItem('bloodPressureResults');
          if (storedHeartRateData && storedBloodPressureData) {
            const parsedHeartRateData = JSON.parse(storedHeartRateData);
            const parsedBloodPressureData = JSON.parse(storedBloodPressureData);
            setHeartRateData(parsedHeartRateData);
            setBloodPressureData(parsedBloodPressureData);
            setDataLoaded(true);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [isFocused]);

  // Dummy data for progress
  const dailyTasksCompleted = 2;
  const totalDailyTasks = 3;
  const progress = (dailyTasksCompleted / totalDailyTasks) * 100;

  const handleCompleteDailyTasks = () => {
    navigation.navigate('DailyTasks');
  };

  const handleViewHeartRateHistory = () => {
    navigation.navigate('HRHistory');
  };

  const handleViewBloodPressureHistory = () => {
    navigation.navigate('BPHistory');
  };

  let [fontsLoaded] = useFonts({ PTSerif_400Regular, PTSerif_700Bold });

  if (!fontsLoaded) {
    return null;
  }


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
          {(fill) => (
            <Text style={styles.progressText}>
              {Math.round((fill / 100) * totalDailyTasks)}/{totalDailyTasks} tasks completed
            </Text>
          )}
        </CircularProgress>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCompleteDailyTasks}>
        <Text style={styles.buttonText}>Complete Daily Tasks</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Latest Trends</Text>
      <View style={styles.dataContainer}>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeader}>Heart Rate</Text>
          <TouchableOpacity style={styles.viewHistoryButton} onPress={handleViewHeartRateHistory}>
            <Text style={styles.viewHistoryButtonText}>View History</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.data}>
          <HeartRateGraph/>
        </View>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeader}>Blood Pressure</Text>
          <TouchableOpacity style={styles.viewHistoryButton} onPress={handleViewBloodPressureHistory}>
            <Text style={styles.viewHistoryButtonText}>View History</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.data}>
          {bloodPressureData.map((item, index) => (
            <View key={index} style={styles.dataItem}>
              <Text>{item.systolic}/{item.diastolic}</Text>
              <Text>{item.timestamp}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  header: {
    marginTop: 15,
    color: 'black',
    fontFamily: 'PTSerif_700Bold',
    fontSize: 20,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionHeader: {
    color: 'black',
    fontFamily: 'PTSerif_700Bold',
    fontSize: 17,
  },
  viewHistoryButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  viewHistoryButtonText: {
    color: 'white',
    fontFamily: 'PTSerif_400Regular',
    fontSize: 14,
  },
  dataContainer: {
    marginTop: 10,
  },
  data: {
    marginTop: 5,
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
});

export default Dashboard;
