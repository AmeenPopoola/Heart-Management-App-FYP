import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import { useNavigation } from '@react-navigation/native';

const DailyTasks = () => {
  const [heartRateChecked, setHeartRateChecked] = useState(false);
  const [bloodPressureChecked, setBloodPressureChecked] = useState(false);
  const [medicationChecked, setMedicationChecked] = useState(false);

  const navigation = useNavigation();

  const handleHeartRateToggle = () => {
    setHeartRateChecked(!heartRateChecked);
    if (!heartRateChecked) {
      navigation.navigate('HeartRate'); // Navigate to HeartRatePage if task is completed
    }
  };

  const handleBloodPressureToggle = () => {
    setBloodPressureChecked(!bloodPressureChecked);
    if (!bloodPressureChecked) {
      navigation.navigate('BloodPressure'); // Navigate to BloodPressurePage if task is completed
    }
  };

  const handleMedicationToggle = () => {
    setMedicationChecked(!medicationChecked);
    if (!medicationChecked) {
      navigation.navigate('Medication'); // Navigate to MedicationPage if task is completed
    }
  };

  let [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });
  
  if (!fontsLoaded) {
    return null;
  }

  const renderCompleteTaskButton = (checked, onPress) => {
    if (!checked) {
      return (
        <TouchableOpacity style={styles.completeTaskButton} onPress={onPress}>
          <Text style={styles.completeTaskButtonText}>Complete Task</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

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
        {renderCompleteTaskButton(heartRateChecked, handleHeartRateToggle)}
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>Measure Blood Pressure</Text>
        <Checkbox
          value={bloodPressureChecked}
          onValueChange={handleBloodPressureToggle}
        />
        {renderCompleteTaskButton(bloodPressureChecked, handleBloodPressureToggle)}
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>Take Medication</Text>
        <Checkbox
          value={medicationChecked}
          onValueChange={handleMedicationToggle}
        />
        {renderCompleteTaskButton(medicationChecked, handleMedicationToggle)}
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
    top: 50,
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
  completeTaskButton: {
    backgroundColor: '#F21E1E',
    padding: 8,
    borderRadius: 5,
    left:8,
  },
  completeTaskButtonText: {
    color: 'white',
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
  },
});

export default DailyTasks;