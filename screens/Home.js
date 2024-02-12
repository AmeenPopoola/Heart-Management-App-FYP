import React , {useEffect,useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {openURL} from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const[userFirstName, setUserFirstName] = useState('');


  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('firstName');
        if(storedFirstName){
          setUserFirstName(storedFirstName);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  },[]);

    return (
      <View style={styles.container} >
        <Text>Welcome {userFirstName ? `Back, ${userFirstName}!` : 'to My Home Page!'}</Text>
        <Button
          title = 'Defibrillator Tracker'
          onPress={() => navigation.navigate("DefibLocation")}
          />

       <Button
         title='Go to Reminder'
         onPress={() => navigation.navigate("Reminder")}
          />
        
        <Button
         title='Call Emergency Services'
         onPress={() => openURL ("tel:999")}
         
          />

          </View>
    );
  };
  
  export default Home

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:'center',
    }
  });