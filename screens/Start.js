import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';

const Start = () => {

  const navigation = useNavigation();

  const handleStartPress =() => {
    navigation.navigate('Setup');
  };

  let [fontsLoaded] = useFonts({
    PTSerif_400Regular,PTSerif_700Bold
  });
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.headerText}>HeartMate</Text>
      <Text style={styles.welcomeText}>
        Welcome to HeartMate,an application for managing your heart health!
      </Text>
      <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
        <Text style={styles.startButtonText}>Let's Start</Text>
      </TouchableOpacity>
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
    },
    startButton: {
      backgroundColor: '#000000', 
      padding: 20,
      borderRadius: 5,
      width:'95%',
      position: 'absolute',
      bottom:'15%',
      },
      startButtonText: {
        fontSize: 18,
        fontFamily: 'PTSerif_400Regular',
        color: '#FFFFFF', 
        textAlign: 'center',
      },
  });

export default Start;