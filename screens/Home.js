import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {openURL} from 'expo-linking';

const Home = ({navigation}) => {
    return (
      <View style={styles.container} >
        <Text>Welcome to My Home Page!</Text>
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