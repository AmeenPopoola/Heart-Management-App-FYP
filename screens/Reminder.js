import React, { useEffect } from 'react';
import { Button } from 'react-native';
import * as Notifications from 'expo-notifications';

const Reminder = () => {
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
  }, []); // Dependency array to run only once on mount

  const triggerNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail!",
        body: 'Here is the notification body',
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <Button onPress={triggerNotifications} title="Trigger Local Notifications" color="#841584" accessibilityLabel="Trigger Local Notifications" />
  );
};

export default Reminder;