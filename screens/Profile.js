import React , {useEffect,useState} from 'react';
import { View, Text,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Profile = () => {
    const[userFirstName, setUserFirstName] = useState('');
  const [age, setAge] = useState('');
  const [gender , setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  const navigation = useNavigation();
    
    useEffect(() => {
        const loadUserData = async () => {
          try {
            const storedFirstName = await AsyncStorage.getItem('firstName');
            const storedAge = await AsyncStorage.getItem('age');
            const storedGender = await AsyncStorage.getItem('gender');
            const storedHeight = await AsyncStorage.getItem('height');
            const storedWeight = await AsyncStorage.getItem('weight');
            const emergencyContacts = await AsyncStorage.getItem('emergencyContacts');



            if(storedFirstName) setUserFirstName(storedFirstName);
              if (storedAge) setAge(storedAge);
              if(storedGender) setGender(storedGender);
              if(storedHeight) setHeight(storedHeight);
              if(storedWeight) setWeight(storedWeight);
              if (emergencyContacts) setEmergencyContacts(JSON.parse(emergencyContacts)); 
          } catch (error) {
            console.error('Error loading user data:', error);
          }
        };
        loadUserData();
      },[]);

      const handleEditProfile = () => {
        // Navigate to the Setup screen
        navigation.navigate('Setup');
      };

  return (
    <View>
      <Text>This is Your Profile</Text>
      <Text>First Name: {userFirstName}</Text>
      <Text>Age: {age}</Text>
      <Text>Gender: {gender}</Text>
      <Text>Height: {height}</Text>
      <Text>Weight: {weight}</Text>

      <Text>Emergency Contacts:</Text>
      {emergencyContacts.map((contact, index) => (
        <View key={index}>
          <Text>Name: {contact.name}</Text>
          <Text>Number: {contact.number}</Text>
        </View>
      ))}

      <Button title="Edit Profile" onPress={handleEditProfile} />
    </View>
  );
};

export default Profile;