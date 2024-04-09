import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './navigation/AuthNavigator';
import Login from './screens/Login';


const App = () => {
  
  
  return (
    <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>
  );
};

export default App;