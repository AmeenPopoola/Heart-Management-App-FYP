import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Checkbox} from 'expo-checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFonts,PTSerif_400Regular,PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import { useNavigation } from '@react-navigation/native';

const DailyTasks = () => {
  const [heartRateChecked, setHeartRateChecked] = useState(false);
  const [bloodPressureChecked, setBloodPressureChecked] = useState(false);

  const navigation = useNavigation();

  const handleHeartRateToggle = () => {
    setHeartRateChecked(!heartRateChecked);
  };

  const handleBloodPressureToggle = () => {
    setBloodPressureChecked(!bloodPressureChecked);
  };

  let [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });
  
  if (!fontsLoaded) {
    return null;
}


  return (
    <View style={styles.container}>
    <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="back" size={24} color="black" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Complete Your Daily Tasks!</Text>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>Measure Heart Rate</Text>
        <Checkbox
          value={heartRateChecked}
          onValueChange={handleHeartRateToggle}
        />
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>Measure Blood Pressure</Text>
        <Checkbox
          value={bloodPressureChecked}
          onValueChange={handleBloodPressureToggle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  header: {
    fontFamily: 'PTSerif_700Bold',
    fontSize: 20,
    marginBottom: 20,
  },
  backButtonText: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
    marginLeft: 5,
  },
  taskText: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
    marginRight: 10,
  },
});

export default DailyTasks;
