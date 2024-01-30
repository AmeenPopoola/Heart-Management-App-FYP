import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';


let defibLocations = [
  {
    title: "V94 YD8P",
    location: {
      latitude: 52.66803,
      longitude: -8.529896
    },
    description : "Just outside Ryan's shop in the old phone box. Call 061953232."
  },
  {
    title: "V94 TRW8",
    location: {
      latitude:52.6719395,
      longitude:-8.5548398
    },
    description : "Outside Gym Entrance"
  },
  {
    title: "V94 A431",
    location: {
      latitude: 52.668468,
      longitude: -8.525015
    },
    description: "Daughters of Charity Disability Support Services"
  },
  {
    title: "V94 YD8P",
    location: {
      latitude: 52.666557,
      longitude: -8.553263
    },
    description:"Castletroy Shopping Centre"
  },
  {
    title: "V94 A6F4",
    location: {
      latitude: 52.655464,
      longitude: -8.553052
    },
    description:"Monaleen G.A.A Clubhouse"
  },
  {
    title: "V94 NX93",
    location: {
      latitude: 52.673176,
      longitude: -8.569802
    },
    description:"University of Limerick - Scholars Club"
  },
  {
    title: "V94 FK61",
    location: {
      latitude: 52.647333,
      longitude: -8.583376
    },
    description:"Raw Cycles / Skatepark, 9 Delta Retail Park"
  },
  {
    title: "V94 XTY5",
    location: {
      latitude: 52.662984,
      longitude: -8.596609
    },
    description:"Giftworks,Dublin Road - Open 7am to 7pm"
  },
  {
    title: "V94 HXW5",
    location: {
      latitude: 52.680933,
      longitude: -8.610998
    },
    description:"Corbally Road, Abbey A"
  },
  {
    title: "V94 EH90",
    location: {
      latitude: 52.670038,
      longitude: -8.629037
    },
    description:"Lloyds Pharmacy,High Road"
  },
  {
    title: "V94 K377",
    location: {
      latitude: 52.662506,
      longitude: -8.625847
    },
    description:"Starbucks,Thomas Street - Not Available Sundays"
  },
  {
    title:"V94 DW21",
    location: {
      latitude: 52.662764,
      longitude: -8.624603
    },
    description:"54 William Street"
  },
  {
    title:"V94 951K",
    location: {
      latitude: 52.66151,
      longitude: -8.62889
    },
    description:"45 O'Connell Street - Accessible During Business Hours"
  },
  {
    title:"V94 V2VW",
    location: {
      latitude: 52.657596,
      longitude: -8.632492
    },
    description:"1 Saint Joseph's Street,Dock B - On The Wall"
  },
  {
    title:"V94 VYX9",
    location: {
      latitude: 52.668753,
      longitude: -8.653878
    },
    description:"Northtown Shopping Centre,Ennis Road CFR,Castle D"
  },
  {
    title:"V94 VYX9",
    location: {
      latitude:52.668679,
      longitude: -8.653949
    },
    description:"Northtown Shopping Centre,Ennis Road - Contact 999 for code"
  },
  {
    title:"V94 XE81",
    location: {
      latitude:52.6559815,
      longitude:-8.6521503
    },
    description:"Unit 3 Ashbourne Business Park - Red Cross Training Building"
  },
  {
    title:"V94 EH51",
    location: {
      latitude:52.59921,
      longitude:-8.705552
    },
    description:"Main Street,Patrickswell - In front of Rehabilitation Centre On The Wall"
  },
  {
    title:"V35 EW89",
    location: {
      latitude:52.545658,
      longitude:-8.605729
    },
    description:"Saint John the Baptist Church,R511,Fedamore"
  },
  {
    title:"V35 YK72",
    location: {
      latitude: 52.511366 ,
      longitude: -8.616468
    },
    description:"R511,Crean,Cappamore - Kilmallock"
  },
  {
    title:"V35 XN29",
    location: {
      latitude:52.520843,
      longitude:-8.713801
    },
    description:"R516,Croom,Adare - Rathkeale"
  },
  {
    title:"V35 FE03",
    location: {
      latitude: 52.467248,
      longitude: -8.786335
    },
    description:"O'Gormans's Foodstore,R518,Ballynoe ED,Newcastle West"
  },
  {
    title:"V35 C584",
    location:{
      latitude: 52.459812,
      longitude: -8.765026
    },
    description:"Ballygrennan ED,Adare - Rathkeale"
  },
  {
    title:"V94 K5P6",
    location:{
      latitude:52.508177,
      longitude: -8.335932
    },
    description:"Garrydoolis National School,Templebredon,Cappamore - Kilmallock"
  },
  {
    title:"V94 TX32",
    location:{
      latitude:52.612389,
      longitude:-8.458778
    },
    description:"Pa McGrath's,Sandylane,Caherconlish"
  },
  {
    title:"V94 HW99",
    location: {
      latitude:52.651389,
      longitude:-8.398991
  },
  description:"Murroe Boher GAA,Main Street,Glenstal,Cappamore"
}
]


const DefibLocation = () => {
    const [currLocation, setCurrLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
  
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
      };
  
      getLocation();

      const locationUpdate = Location.watchPositionAsync(
        {accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 1},
        (newLocation) => {
            setCurrLocation(newLocation.coords);
        }
      );

      return () => {
        if (locationUpdate){
            locationUpdate.remove();
        }
      }
    }, []);
  
    const onRegionChange = (region) => {
      console.log(region);
    };
  
    const showDefibLocations = () => {
      return defibLocations.map((item, index) => {
        return (
          <Marker
            key={index}
            coordinate={item.location}
            title={item.title}
            description={item.description}
          />
        );
      });
    };
  
    return (
      <View style={styles.container}>
        {initialRegion && (
          <MapView
            style={styles.map}
            onRegionChange={onRegionChange}
            initialRegion={initialRegion} // Remove the extra curly braces
          >
            {currLocation && (
              <Marker
                coordinate={{
                  latitude: currLocation.latitude,
                  longitude: currLocation.longitude,
                }}
                title="Your Location"
                pinColor = "blue"
              />
            )}
            {showDefibLocations()}
          </MapView>
        )}
      </View>
    );
  };

export default DefibLocation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});