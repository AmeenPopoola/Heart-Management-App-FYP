import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { app, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import SignUpForm from "../components/sign-up/SignUpForm";
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState,useEffect } from "react";

const SignUp = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to upload heart rate data to Firestore
  const uploadHeartRateDataToFirestore = async (uid, heartRateData) => {
    try {
      // Reference to the document in the 'userHRReadings' collection corresponding to the user's UID
      const userHRReadingsDocRef = doc(db, "userHRReadings", uid);
  
      // Set the heart rate data under the user's document in the 'userHRReadings' collection
      await setDoc(userHRReadingsDocRef, {
        heartRateData: heartRateData,
      });
  
      console.log("Heart rate data uploaded to Firestore");
    } catch (error) {
      console.error("Error uploading heart rate data to Firestore:", error);
    }
  };

  const uploadBloodPressureDataToFirestore = async (uid, bloodPressureData) => {
    try {
      // Reference to the document in the 'userBPReadings' collection corresponding to the user's UID
      const userBPReadingsDocRef = doc(db, "userBPReadings", uid);
  
      // Set the blood pressure data under the user's document in the 'userBPReadings' collection
      await setDoc(userBPReadingsDocRef, {
        bloodPressureData: bloodPressureData,
      });
  
      console.log("Blood pressure data uploaded to Firestore");
    } catch (error) {
      console.error("Error uploading blood pressure data to Firestore:", error);
    }
  };

  const uploadProfileDataToFirestore = async (uid, profileData, emergencyContacts) => {
    try {
      // Reference to the user document in Firestore
      const userDocRef = doc(db, "userInfo", uid);
  
      // Construct the data object to be uploaded to Firestore
      const userData = {
        firstName: profileData.firstName,
        age: profileData.age,
        gender: profileData.gender,
        height: profileData.height,
        weight: profileData.weight,
        emergencyContacts: emergencyContacts,
      };
  
      // Upload user profile data to Firestore
      await setDoc(userDocRef, userData);
  
      console.log("User profile data uploaded to Firestore");
    } catch (error) {
      console.error("Error uploading user profile data to Firestore:", error);
    }
  };

  // Function to handle sign up
  const handleSignUp = async (email, password) => {
    const auth = getAuth(app);
    try {
      if (!isValidPassword(password)) {
        console.error("Password must be at least 8 characters long and contain at least one capital letter and one number.");
        return;
    }

    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
      const user = userCredential.user;

      // After successful sign-up, retrieve heart rate data from AsyncStorage
      const heartRateData = await AsyncStorage.getItem("heartRateResults");
      if (heartRateData) {
        const parsedHeartRateData = JSON.parse(heartRateData);
        // Upload heart rate data to Firestore
        await uploadHeartRateDataToFirestore(user.uid, parsedHeartRateData);
      }

      const bloodPressureData = await AsyncStorage.getItem("bpRecords");
      if (bloodPressureData) {
        const parsedBloodPressureData = JSON.parse(bloodPressureData);
        // Upload heart rate data to Firestore
        await uploadBloodPressureDataToFirestore(user.uid, parsedBloodPressureData);
      }

      const firstName = await AsyncStorage.getItem('firstName');
      const age = await AsyncStorage.getItem('age');
      const gender = await AsyncStorage.getItem('gender');
      const height = await AsyncStorage.getItem('height');
      const weight = await AsyncStorage.getItem('weight');
      const themeState = await AsyncStorage.getItem('themeState');
      const emergencyContacts = await AsyncStorage.getItem('emergencyContacts');
      if (user && firstName && age && gender && height && weight && emergencyContacts) {
        await uploadProfileDataToFirestore(user.uid, {
          firstName: firstName,
          age: age,
          gender: gender,
          height: height,
          weight: weight,
        }, JSON.parse(emergencyContacts));
      }
      


      console.log('SIGNUP USER', user);

      // Add user data to Firestore
      const userData = {
        email: email,
        signupDate: new Date().toISOString(),
        role: 'user', // Set default role to 'user'
      };
      await setDoc(doc(db, "users", user.uid), userData);
      console.log("User data added to Firestore");

      setIsLoggedIn(true);
      AsyncStorage.setItem('isLoggedIn', 'true');
      AsyncStorage.setItem('uid', user.uid);

      const userUid = user.uid;
console.log('User UID:', userUid);


      navigation.navigate('Dashboard');
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  };

  const isValidPassword = (password) => {
    // Minimum length is 8 characters
    if (password.length < 8) return false;
    // Must contain at least one capital letter
    if (!/[A-Z]/.test(password)) return false;
    // Must contain at least one number
    if (!/\d/.test(password)) return false;
    return true;
};

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.heading}>Signing Up Allows You To Access Your Data On Any Device When You Login!</Text>
      <View style={styles.formContainer}>
        <SignUpForm onSignUp={handleSignUp} />
      </View>
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
  heading: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400, 
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 999, 
  },
});

export default SignUp;