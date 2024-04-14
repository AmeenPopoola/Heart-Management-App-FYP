import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app, db } from "../firebaseConfig";
import { collection, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  console.log('DB:', db); // Check if db is correctly imported
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

            // Navigate based on user role
            if (role === 'admin') {
                navigation.navigate('AdminNav');
            } else if (role === 'user') {
                navigation.navigate('Dashboard');
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
});

export default Login;