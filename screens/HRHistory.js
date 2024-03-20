import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HRHistory = () => {
  const navigation = useNavigation();
  const [heartRateHistory, setHeartRateHistory] = useState([]);
  const [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });

  useEffect(() => {
    const fetchHeartRateHistory = async () => {
      try {
        const storedData = await AsyncStorage.getItem('heartRateResults');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setHeartRateHistory(parsedData);
        }
      } catch (error) {
        console.error('Error fetching heart rate history:', error);
      }
    };

    fetchHeartRateHistory();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="back" size={24} color="black" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Heart Rate History</Text>
      <FlatList
        data={heartRateHistory}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.heartRate} bpm</Text>
            <Text style={styles.itemText}>{item.timestamp}</Text>
            <View style={[styles.square, { backgroundColor: item.isWithinRange ? 'green' : 'red' }]} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
    marginLeft: 5,
  },
  header: {
    fontFamily: 'PTSerif_700Bold',
    fontSize: 20,
    marginTop: 60,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  itemText: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
  },
  square: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginLeft: 10,
  }
});

export default HRHistory;