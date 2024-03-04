import React from 'react';
import { View, Text, Button} from 'react-native';

const Emergency = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is the emergency</Text>
      <Button
          title = 'Defibrillator Tracker'
          onPress={() => navigation.navigate("DefibLocation")}
          />
          <Button
         title='Go to Profile'
         onPress={() => navigation.navigate("Home")}
          />
    </View>
  );
};

export default Emergency;