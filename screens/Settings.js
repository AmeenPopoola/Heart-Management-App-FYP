import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Text, TouchableOpacity, Switch } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import { lightThemeStyles,darkThemeStyles } from '../styles/themeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const navigation = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate("Profile")
  };

  const handleReminderPress = () => {
    navigation.navigate("Reminder")
  };

  const handleThemeSwitch = () => {
    setForm({ ...form, darkMode: value });
    AsyncStorage.setItem('themeState', JSON.stringify(value));
  };

  let [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const themeText = form.darkMode ? 'Dark' : 'Light';
  const themeStyles = form.darkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <SafeAreaView style={[ styles.container, themeStyles.container]}>
      <ScrollView>
        <View style={[styles.section, themeStyles.section]}>
          <TouchableOpacity
            style={[styles.backButton, themeStyles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Icon name="back" size={24} color={themeStyles.backButtonText.color} />
            <Text style={[styles.backButtonText, themeStyles.backButtonText]}>Back</Text>
          </TouchableOpacity>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, themeStyles.sectionTitle]}>Profile</Text>
            <TouchableOpacity style={[styles.row, themeStyles.row]} onPress={handleProfilePress}>
              <View style={[styles.rowIcon, themeStyles.rowIcon]}>
                <FeatherIcon name="user" size={20} color="#fff" />
              </View>
              <Text style={[styles.rowLabel, themeStyles.rowLabel]}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.section, themeStyles.section]}>
            <Text style={[styles.sectionTitle, themeStyles.sectionTitle]}>Preferences</Text>
            <TouchableOpacity style={[styles.row, themeStyles.row]} onPress={handleReminderPress}>
              <View style={[styles.rowIcon, themeStyles.rowIcon]}>
                <FeatherIcon name="bell" size={20} color="#fff" />
              </View>
              <Text style={[styles.rowLabel, themeStyles.rowLabel]}>Set Reminder</Text>
            </TouchableOpacity>
            <View style={[styles.row, themeStyles.row, styles.themeRow]}>
              <View style={[styles.rowIcon, themeStyles.rowIcon]}>
                <FeatherIcon name="moon" size={20} color="#fff" />
              </View>
              <Text style={[styles.rowLabel, themeStyles.rowLabel]}>Set Theme</Text>
              <View style={styles.switchContainer}>
                <Switch
                  value={form.darkMode}
                  onValueChange={handleThemeSwitch}
                />
                 <Text style={[styles.rowLabel, styles.themeText]}>{themeText}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    marginTop: 20,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'PTSerif_700Bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rowLabel: {
    fontSize: 16,
    fontFamily: 'PTSerif_400Regular',
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'PTSerif_400Regular',
  },
  switchContainer: {
    marginLeft: 'auto',
  },
  themeRow: {
    justifyContent: 'flex-start',
  },
  themeText: {
    fontFamily: 'PTSerif_700Bold',
    fontSize: 18,
  },
});

export default Settings;
