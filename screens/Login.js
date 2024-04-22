import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app, db } from "../firebaseConfig";
import { collection, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(!!userLoggedIn); // Convert to boolean
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    checkLoginStatus();
  }, []);
  
  const navigation = useNavigation();

  const handleLogin = async () => {
    const auth = getAuth(app);
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Retrieve user role from Firestore
        const userDocRef = doc(collection(db, "users"), user.uid);
        const userDoc = await getDoc(userDocRef);

        // Check if the document exists
        if (userDoc.exists()) {
            // Retrieve user role from Firestore data
            const userData = userDoc.data();
            const role = userData.role;

            if (role === 'admin') {
                navigation.navigate('AdminNav');
            } else if (role === 'user') {
              const userInfoDoc = doc(collection(db, "userInfo"), user.uid);
              const userInfo = await getDoc(userInfoDoc);

              const hRReadingsDoc = doc(collection(db, "userHRReadings"), user.uid);
              const hRData = await getDoc(hRReadingsDoc);

              const bPReadingsDoc = doc(collection(db, "userBPReadings"), user.uid);
              const bPData = await getDoc(bPReadingsDoc);
              if(userInfo.exists()){
                const infoData = userInfo.data();
      
                await AsyncStorage.setItem('firstName', infoData.firstName);
                await AsyncStorage.setItem('age', infoData.age);
                await AsyncStorage.setItem('gender', infoData.gender);
                await AsyncStorage.setItem('height', infoData.height);
                await AsyncStorage.setItem('weight', infoData.weight);
                await AsyncStorage.setItem('emergencyContacts', JSON.stringify(infoData.emergencyContacts));
              }

              if(hRData.exists()) {
                // Extract HR readings data
                const hRReadingsData = hRData.data().heartRateData;
                // Store HR readings in AsyncStorage
                  await AsyncStorage.setItem('heartRateResults', JSON.stringify(hRReadingsData));
              }

              if (bPData.exists()) {
              // Extract BP readings data from the document
              const bPReadingsData = bPData.data().bloodPressureData;
              // Store BP readings in AsyncStorage
              await AsyncStorage.setItem('bpRecords', JSON.stringify(bPReadingsData));
                }
                AsyncStorage.setItem('isLoggedIn', 'true');
                AsyncStorage.setItem('uid', user.uid);
                navigation.navigate('MainApp');
            }
        } else {
            Alert.alert('Error', 'User data not found.');
        }
    } catch (error) {
        console.error('Login error:', error.message);
        Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    marginTop:20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 999, // Ensure the button is above other components
  },
});

export default Login;