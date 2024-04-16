import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform, TimePickerAndroid, Modal, FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import { darkThemeStyles ,lightThemeStyles } from '../styles/Reminder/reminderStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Reminder = () => {
  const [notificationTime, setNotificationTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [selectedReminderType, setSelectedReminderType] = useState(null);
  const [medicationReminders, setMedicationReminders] = useState([]);
  const [bloodPressureReminders, setBloodPressureReminders] = useState([]);
  const [heartRateReminders, setHeartRateReminders] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('themeState');
        const medicationReminders = await AsyncStorage.getItem('medicationReminders');
        const bloodPressureReminders = await AsyncStorage.getItem('bloodPressureReminders');
        const heartRateReminders = await AsyncStorage.getItem('heartRateReminders');

        if (storedTheme !== null) {
          const parsedTheme = JSON.parse(storedTheme);
          setIsDarkMode(parsedTheme);
        } 
        if (medicationReminders !== null) {
          setMedicationReminders(JSON.parse(medicationReminders));
        }
        if (bloodPressureReminders !== null) {
          setBloodPressureReminders(JSON.parse(bloodPressureReminders));
        }
        if (heartRateReminders !== null) {
          setHeartRateReminders(JSON.parse(heartRateReminders));
        }
      } catch (error) {
        console.error('Error loading info:', error);
      }
    };

    loadInfo();
  }, []);

  useEffect(() => {
    const getNotificationPermission = async () => {
      const settings = await Notifications.getPermissionsAsync();

      if (settings.status !== 'granted') {
        const { status: askStatus } = await Notifications.requestPermissionsAsync();

        if (askStatus !== 'granted') {
          console.log('Notification permission not granted');
        }
      }
    };

    getNotificationPermission();
  }, []);

  const showTimePicker = () => {
    setShowPicker(true);
  };

  const navigation = useNavigation();

  const handleTimeChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setNotificationTime(selectedDate);
    }
  };

  const triggerNotification = async (reminderType, newReminder) => {
    // Schedule notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Reminder: ${newReminder.title}`,
        body: `Check your ${reminderType} reminder at ${newReminder.time}.`,
      },
      trigger: { seconds: Math.floor((newReminder.notificationTime - new Date()) / 1000) },
    });
  };

  const addReminder = async () => {
    let reminderTitle = '';
    switch (selectedReminderType) {
      case 'Medication':
        reminderTitle = "Time to take your medication";
        break;
      case 'Blood Pressure':
        reminderTitle = "Time to take your Blood Pressure";
        break;
      case 'Heart Rate':
        reminderTitle = "Time to check your Heart Rate";
        break;
      default:
        break;
    }
  
    const newReminder = {
      id: Date.now().toString(),
      title: reminderTitle,
      time: notificationTime.toLocaleTimeString(),
      notificationTime: notificationTime,
    };
  
    // Trigger notification immediately
    triggerNotification(selectedReminderType, newReminder);
  
    // Update reminders state based on the reminder type
    switch (selectedReminderType) {
      case 'Medication':
        setMedicationReminders((prevReminders) => [...prevReminders, newReminder]);
        await AsyncStorage.setItem('medicationReminders', JSON.stringify([...medicationReminders, newReminder]));
        break;
      case 'Blood Pressure':
        setBloodPressureReminders((prevReminders) => [...prevReminders, newReminder]);
        await AsyncStorage.setItem('bloodPressureReminders', JSON.stringify([...bloodPressureReminders, newReminder]));
        break;
      case 'Heart Rate':
        setHeartRateReminders((prevReminders) => [...prevReminders, newReminder]);
        await AsyncStorage.setItem('heartRateReminders', JSON.stringify([...heartRateReminders, newReminder]));
        break;
      default:
        break;
    }
  
    // Close modal
    setShowAddReminderModal(false);
  };

  const renderReminderItem = ({ item }) => (
    <View style={styles.reminderItem}>
      <View style={styles.reminderInfoContainer}>
        <Text style={styles.reminderInfo}>Time: {item.time}</Text>
      </View>
      <TouchableOpacity onPress={() => removeReminder(item.id)}>
        <Icon name="closecircle" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const removeReminder = async (id) => {
    // Filter out the reminder with the specified ID from each reminder type
    const updatedMedicationReminders = medicationReminders.filter((reminder) => reminder.id !== id);
    const updatedBloodPressureReminders = bloodPressureReminders.filter((reminder) => reminder.id !== id);
    const updatedHeartRateReminders = heartRateReminders.filter((reminder) => reminder.id !== id);
  
    // Update state
    setMedicationReminders(updatedMedicationReminders);
    setBloodPressureReminders(updatedBloodPressureReminders);
    setHeartRateReminders(updatedHeartRateReminders);
  
    // Update AsyncStorage
    try {
      await AsyncStorage.setItem('medicationReminders', JSON.stringify(updatedMedicationReminders));
      await AsyncStorage.setItem('bloodPressureReminders', JSON.stringify(updatedBloodPressureReminders));
      await AsyncStorage.setItem('heartRateReminders', JSON.stringify(updatedHeartRateReminders));
    } catch (error) {
      console.error('Error removing reminder:', error);
    }
  };

  const renderAddReminderButton = (sectionTitle, reminderType) => (
    <View style={styles.addReminderContainer}>
      <Icon name="pluscircle" onPress={() => {setShowAddReminderModal(true); setSelectedReminderType(reminderType); }} size={24} color="red" />
      <Text style={styles.addReminderText} onPress={() => { setShowAddReminderModal(true); setSelectedReminderType(reminderType); }}>Add Reminder for {sectionTitle}</Text>
    </View>
  );

  let [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="back" size={24} color="black" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Medication Reminder Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medication Reminder</Text>
        {renderAddReminderButton('Medication', 'Medication')}
        <FlatList
          data={medicationReminders}
          keyExtractor={(item) => item.id}
          renderItem={renderReminderItem}
        />
      </View>

      {/* Blood Pressure Reminder Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Blood Pressure Reminder</Text>
        {renderAddReminderButton('Blood Pressure', 'Blood Pressure')}
        <FlatList
          data={bloodPressureReminders}
          keyExtractor={(item) => item.id}
          renderItem={renderReminderItem}
        />
      </View>

      {/* Heart Rate Reminder Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Heart Rate Reminder</Text>
        {renderAddReminderButton('Heart Rate', 'Heart Rate')}
        <FlatList
          data={heartRateReminders}
          keyExtractor={(item) => item.id}
          renderItem={renderReminderItem}
        />
      </View>

      <Modal visible={showAddReminderModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Reminder</Text>
          <TouchableOpacity onPress={showTimePicker} style={styles.setTimeButton}>
            <Text style={styles.setTimeText}>Set Reminder Time</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={notificationTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}
          <Button onPress={addReminder} title={`Add Reminder for ${selectedReminderType}`} color="#F21E1E" accessibilityLabel={`Add Reminder for ${selectedReminderType}`} />
          <Button onPress={() => setShowAddReminderModal(false)} title="Cancel" color="#F21E1E" accessibilityLabel="Cancel" />
        </View>
      </Modal>
    </View>
  );
};


export default Reminder;
