import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { lightThemeStyles,darkThemeStyles } from '../styles/Emergency/defibStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loadDefibLocations from '../functions/db-data-loading/DefibData';



const DefibLocation = () => {
  const [defibLocations, setDefibLocations] = useState([]);
    const [currLocation, setCurrLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
      const loadTheme = async () => {
        try {
          const storedTheme = await AsyncStorage.getItem('themeState');
          if (storedTheme !== null) {
            const parsedTheme = JSON.parse(storedTheme);
            setIsDarkMode(parsedTheme);
          }
        } catch (error) {
          console.error('Error loading theme:', error);
        }
      };
  
      loadTheme();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        const defibData = await loadDefibLocations();
        setDefibLocations(defibData);
      };
  
      fetchData();
    }, []);

    const navigation = useNavigation();
  
    useEffect(() => {
      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          console.log('Permission is granted');
        } else {
          console.log('Permission is denied');
        }
  
        const location = await Location.getCurrentPositionAsync();
        console.log(location);
        setCurrLocation(location.coords);
  
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });

  
        const locationUpdate = Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 1 },
          (newLocation) => {
            setCurrLocation(newLocation.coords);
          }
        );
    
        // Return a cleanup function to unsubscribe
        return () => {
          if (locationUpdate && locationUpdate.remove) {
            locationUpdate.remove();
          }
        };
      };
    
      getLocation();
    }, []);

    
    const onRegionChange = (region) => {
      console.log(region);
    };
  
    const showDefibLocations = () => {
      return defibLocations.map((location, index) => {
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: location.location.latitude,
              longitude: location.location.longitude,
            }}
            title={location.title}
            description={location.description}
            pinColor="red"
          />
        );
      });
    };

    const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;

    return (
      <View style={styles.container}>
      <View style={styles.headerContainer}>
       <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="back" size={24} color={styles.backButtonText.color} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
        <Text style={styles.header}>Defibrillator Map</Text>
        </View>
        {initialRegion && (
          <MapView
            style={styles.map}
            onRegionChange={onRegionChange}
            initialRegion={initialRegion}
          >
            {currLocation && (
              <Marker
                coordinate={{
                  latitude: currLocation.latitude,
                  longitude: currLocation.longitude,
                }}
                title="Your Location"
                pinColor="blue"
              />
            )}
            {showDefibLocations()}
          </MapView>
        )}
      </View>
    );
  };
  
  export default DefibLocation;
  