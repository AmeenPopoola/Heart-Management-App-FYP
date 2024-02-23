import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useFonts, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';

const TextInputWithLabel = ({ label, value, placeholder, keyboardType, onChangeText }) => {
    let [fontsLoaded] = useFonts({
        PTSerif_400Regular,
      });
    
      if (!fontsLoaded) {
        return null;
      }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

export default TextInputWithLabel;