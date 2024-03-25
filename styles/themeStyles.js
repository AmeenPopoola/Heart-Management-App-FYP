import { StyleSheet } from 'react-native';

export const lightThemeStyles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    section: {
      backgroundColor: '#f0f0f0',
    },
    backButton: {
      backgroundColor: '#ddd',
    },
    backButtonText: {
      color: 'black',
    },
    sectionTitle: {
      color: 'black',
    },
    row: {
      backgroundColor: '#ccc',
    },
    rowIcon: {
      backgroundColor: '#F21E1E',
    },
    rowLabel: {
      color: 'black',
    },
    themeText: {
      color: 'black',
    },
  });
  
  export const darkThemeStyles = StyleSheet.create({
    container: {
      backgroundColor: '#333',
    },
    section: {
      backgroundColor: '#555',
    },
    backButton: {
      backgroundColor: '#666',
    },
    backButtonText: {
      color: 'white',
    },
    sectionTitle: {
      color: 'white',
    },
    row: {
      backgroundColor: '#777',
    },
    rowIcon: {
      backgroundColor: '#333',
    },
    rowLabel: {
      color: 'white',
    },
    themeText: {
      color: 'white',
    },
  });