import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import StartButton from '../components/user-setup-process/Start/StartButton';


const Start = () => {
  const navigation = useNavigation();

  const handleStartPress = () => {
    navigation.navigate('Setup');
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  let [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.headerText}>HeartMate</Text>
      <Text style={styles.welcomeText}>
        Welcome to HeartMate, an application for managing your heart health!
      </Text>
      <Text style={styles.loginText} onPress={handleLoginPress}>
        Already Have An Account? Login Here
      </Text>
      <StartButton onPress={handleStartPress} />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF', 
    },
    headerText: {
        fontFamily: 'PTSerif_700Bold',
        fontSize: 24,
        fontWeight:'bold',
        color: '#000000',
        marginBottom: 10,
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    welcomeText: {
      textAlign: 'center',
      fontSize: 20,
      fontFamily: 'PTSerif_400Regular',
      color: '#000000', 
      marginBottom: 20,
    },
    loginText: {
      fontSize: 16,
      fontFamily: 'PTSerif_400Regular',
      color: '#0000FF',
      textDecorationLine: 'underline',
      marginBottom: 20,
    },
  });

export default Start;