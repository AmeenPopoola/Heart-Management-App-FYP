import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform, TimePickerAndroid, Modal, TextInput,FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import Icon from 'react-native-vector-icons/AntDesign';

const Reminder = () => {
  const [notificationTime, setNotificationTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [reminderTitle, setReminderTitle] = useState('');
  const [medicationReminders, setMedicationReminders] = useState([]);
  const [bloodPressureReminders, setBloodPressureReminders] = useState([]);
  const [heartRateReminders, setHeartRateReminders] = useState([]);

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

  const showTimePicker = async () => {
    if (Platform.OS === 'android') {
      try {
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: notificationTime.getHours(),
          minute: notificationTime.getMinutes(),
          is24Hour: true,
        });

        if (action !== TimePickerAndroid.dismissedAction) {
          const selectedTime = new Date();
          selectedTime.setHours(hour);
          selectedTime.setMinutes(minute);
          setNotificationTime(selectedTime);
        }
      } catch (error) {
        console.error('Error opening time picker:', error.message);
      }
    } else {
      setShowPicker(true);
    }
  };

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

  const addReminder = (reminderType) => {
    const newReminder = {
      id: Date.now().toString(),
      title: reminderTitle || "You've got a reminder!",
      time: notificationTime.toLocaleTimeString(),
      notificationTime: notificationTime,
    };

    // Trigger notification immediately
    triggerNotification(reminderType, newReminder);

    // Update reminders state based on the reminder type
    switch (reminderType) {
      case 'Medication':
        setMedicationReminders((prevReminders) => [...prevReminders, newReminder]);
        break;
      case 'Blood Pressure':
        setBloodPressureReminders((prevReminders) => [...prevReminders, newReminder]);
        break;
      case 'Heart Rate':
        setHeartRateReminders((prevReminders) => [...prevReminders, newReminder]);
        break;
      default:
        break;
    }

    // Reset reminder title and close modal
    setReminderTitle('');
    setShowAddReminderModal(false);
  };

  const renderReminderItem = ({ item }) => (
    <View style={styles.reminderItem}>
      <Text>{item.title}</Text>
      <Text>Time: {item.time}</Text>
    </View>
  );

  const renderAddReminderButton = (sectionTitle) => (
    <View style={styles.addReminderContainer}>
      <Icon name="pluscircle" onPress={() => setShowAddReminderModal(true)} size={24} color="#841584" />
      <Text style={styles.addReminderText} onPress={() => setShowAddReminderModal(true)}>Add Reminder for {sectionTitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Medication Reminder Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medication Reminder</Text>
        {renderAddReminderButton('Medication')}
        <FlatList
          data={medicationReminders}
          keyExtractor={(item) => item.id}
          renderItem={renderReminderItem}
        />
      </View>

      {/* Blood Pressure Reminder Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Blood Pressure Reminder</Text>
        {renderAddReminderButton('Blood Pressure')}
        <FlatList
          data={bloodPressureReminders}
          keyExtractor={(item) => item.id}
          renderItem={renderReminderItem}
        />
      </View>

      {/* Heart Rate Reminder Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Heart Rate Reminder</Text>
        {renderAddReminderButton('Heart Rate')}
        <FlatList
          data={heartRateReminders}
          keyExtractor={(item) => item.id}
          renderItem={renderReminderItem}
        />
      </View>

      <Modal visible={showAddReminderModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Reminder</Text>
          <TextInput
            style={styles.input}
            placeholder="Reminder Title"
            value={reminderTitle}
            onChangeText={(text) => setReminderTitle(text)}
          />
          <Button onPress={showTimePicker} title="Set Reminder Time" color="#841584" accessibilityLabel="Set Reminder Time" />
          {Platform.OS === 'ios' && showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={notificationTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}
          <Button onPress={() => addReminder('')} title="Add Reminder" color="#841584" accessibilityLabel="Add Reminder" />
          <Button onPress={() => setShowAddReminderModal(false)} title="Cancel" color="#841584" accessibilityLabel="Cancel" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addReminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addReminderText: {
    marginLeft: 10,
    color: '#841584',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  reminderItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});

export default Reminder;