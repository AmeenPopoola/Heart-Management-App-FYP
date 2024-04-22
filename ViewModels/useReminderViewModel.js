import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { ReminderModel } from '../Models/ReminderModel';

export const useReminderViewModel = () => {
  const [notificationTime, setNotificationTime] = useState(new Date());
  const [medicationReminders, setMedicationReminders] = useState([]);
  const [bloodPressureReminders, setBloodPressureReminders] = useState([]);
  const [heartRateReminders, setHeartRateReminders] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [isAddingReminder, setIsAddingReminder] = useState(false);


  useEffect(() => {
    // Load reminders and theme state from AsyncStorage on component mount
    const loadInfo = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('themeState');
        const medicationRemindersData = await AsyncStorage.getItem('medicationReminders');
        const bloodPressureRemindersData = await AsyncStorage.getItem('bloodPressureReminders');
        const heartRateRemindersData = await AsyncStorage.getItem('heartRateReminders');

        if (storedTheme !== null) {
          const parsedTheme = JSON.parse(storedTheme);
          setIsDarkMode(parsedTheme);
        }
        if (medicationRemindersData !== null) {
          setMedicationReminders(JSON.parse(medicationRemindersData));
        }
        if (bloodPressureRemindersData !== null) {
          setBloodPressureReminders(JSON.parse(bloodPressureRemindersData));
        }
        if (heartRateRemindersData !== null) {
          setHeartRateReminders(JSON.parse(heartRateRemindersData));
        }
      } catch (error) {
        console.error('Error loading info:', error);
      }
    };

    loadInfo();
  }, []);

  const addReminder = async (selectedReminderType) => {
      if (!isAddingReminder) {
        setIsAddingReminder(true);
    
        // Create a new reminder based on the selected type
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
    
        setIsAddingReminder(false);
      }
    };

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

  return {
    notificationTime,
    setNotificationTime,
    medicationReminders,
    bloodPressureReminders,
    heartRateReminders,
    setMedicationReminders,
    setBloodPressureReminders,
    setHeartRateReminders,
    addReminder,
    isDarkMode, 
    setIsDarkMode, 
    showAddReminderModal, 
    setShowAddReminderModal, 
    removeReminder
  };
};

export default useReminderViewModel;