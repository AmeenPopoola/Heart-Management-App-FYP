import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal,Platform,Button,FlatList,TimePickerAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import { darkThemeStyles ,lightThemeStyles } from '../styles/Reminder/reminderStyles';
import useReminderViewModel from '../ViewModels/useReminderViewModel';

const Reminder = () => {
  const {
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
  } = useReminderViewModel();

  const [showPicker, setShowPicker] = useState(false);
  const [selectedReminderType, setSelectedReminderType] = useState(null);
  

  const navigation = useNavigation();

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

  const handleTimeChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setNotificationTime(selectedDate);
    }
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
          <Button onPress={() => addReminder(selectedReminderType)} title={`Add Reminder for ${selectedReminderType}`} color="#F21E1E" accessibilityLabel={`Add Reminder for ${selectedReminderType}`} />
          <Button onPress={() => setShowAddReminderModal(false)} title="Cancel" color="#F21E1E" accessibilityLabel="Cancel" />
        </View>
      </Modal>
    </View>
  );
};

export default Reminder;