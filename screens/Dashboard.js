import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import WelcomeHeader from '../components/home-page-setup/WelcomeHeader';
import { CircularProgress } from 'react-native-circular-progress';
import HeartRateGraph from '../components/heart-rate-info/HeartRateGraph';
import { lightThemeStyles,darkThemeStyles } from '../styles/Dashboard/dashboardStyles';


const Dashboard = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [heartRateData, setHeartRateData] = useState([]);
  const [bloodPressureData, setBloodPressureData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const storedTheme = await AsyncStorage.getItem('themeState');
          const storedHeartRateData = await AsyncStorage.getItem('heartRateResults');
          const storedBloodPressureData = await AsyncStorage.getItem('bpRecords');
          const storedTaskCount = await AsyncStorage.getItem('completedTasksCount');
          if (storedHeartRateData && storedBloodPressureData && storedTaskCount) {
            const parsedHeartRateData = JSON.parse(storedHeartRateData);
            const parsedBloodPressureData = JSON.parse(storedBloodPressureData);
            const parsedTaskCount = JSON.parse(storedTaskCount);

            setHeartRateData(parsedHeartRateData);
            setBloodPressureData(parsedBloodPressureData);
            setTaskCount(parsedTaskCount);
            setDataLoaded(true);
          if (storedTheme !== null) {
              const parsedTheme = JSON.parse(storedTheme);
              setIsDarkMode(parsedTheme);
            };
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
  const progress = (taskCount / totalDailyTasks) * 100;

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

  const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;

  


  return (
    <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
      <WelcomeHeader />
      <View style={styles.sectionContainer}>
      <View style={styles.progressContainer}>
        <CircularProgress
          size={200}
          width={10}
          fill={(progress / 100) * 100}
          tintColor="#F21E1E"
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
      </View>

      {/*Latest Trends Section*/}
      <Text style={styles.header}>Latest Trends</Text>
      <View style={styles.dataContainer}>
  {/* Heart Section */}
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
  {/* Blood Pressure Section */}
  <View style={styles.sectionHeaderContainer}>
    <Text style={styles.sectionHeader}>Blood Pressure</Text>
    <TouchableOpacity style={styles.viewHistoryButton} onPress={handleViewBloodPressureHistory}>
      <Text style={styles.viewHistoryButtonText}>View History</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.data}>
  {bloodPressureData.length > 0 && (
    <View style={styles.dataItem}>
      <Text style={styles.dataItemText}>Last Reading: {bloodPressureData[bloodPressureData.length - 1].systolic}/{bloodPressureData[bloodPressureData.length - 1].diastolic} hhMg</Text>
      <Text style={styles.dataItemText}>Time: {bloodPressureData[bloodPressureData.length - 1].time}</Text>
      <Text style={styles.dataItemText}>Blood Pressure Category: {bloodPressureData[bloodPressureData.length - 1].category}</Text>
    </View>
  )}
</View>
</View>
    </ScrollView>
    </View>
  );
};


export default Dashboard;
