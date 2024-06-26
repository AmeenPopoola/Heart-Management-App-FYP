import React, { useState, useEffect } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightThemeStyles,darkThemeStyles } from '../../styles/graphStyles';

const HeartRateGraph = () => {
  const [heartRateData, setHeartRateData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchHeartRateData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('heartRateResults');
        const storedTheme = await AsyncStorage.getItem('themeState');
        if (storedTheme !== null) {
          const parsedTheme = JSON.parse(storedTheme);
          setIsDarkMode(parsedTheme);
        }
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          // Get the last 5 results
          const lastFiveResults = parsedData.slice(Math.max(parsedData.length - 5, 0));
          setHeartRateData(lastFiveResults);
        }
      } catch (error) {
        console.error('Error fetching heart rate data:', error);
      }
    };

    fetchHeartRateData();
  }, [heartRateData, isDarkMode]);

  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month}`;
    return formattedDate;
  };


// Handle empty data or other error cases
if (heartRateData.length === 0) {
  return <Text>No data available</Text>;
}

  // Function to get the ordinal suffix for the day (e.g., 1st, 2nd, 3rd)
  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  // Extracting formatted timestamps and heart rates from the data
  const labels = heartRateData.map(item => formatTimestamp(item.timestamp));
  const data = heartRateData.map(item => item.heartRate);

  if (data.some(value => isNaN(value) || !isFinite(value))) {
    console.error('Invalid data values:', data);
    return <Text>Invalid data values</Text>;
  }

  const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: labels,
          datasets: [{ data: data }],
        }}
        width={350} // from react-native
        height={220}
        yAxisSuffix=" bpm"
        yAxisInterval={50}
        chartConfig={{
          backgroundColor:  isDarkMode ? '#333333' : '#FFFFFF',
          backgroundGradientFrom:  isDarkMode ? '#333333' : '#FFFFFF',
          backgroundGradientTo:  isDarkMode ? '#333333' : '#FFFFFF',
          decimalPlaces: 0, // precision of the y-axis labels
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(${isDarkMode ? '255, 255, 255' : '0, 0, 0'}, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#F21E1E',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};


export default HeartRateGraph;