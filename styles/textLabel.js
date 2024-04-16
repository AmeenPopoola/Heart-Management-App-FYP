import { StyleSheet } from "react-native";

export const lightThemeStyles = StyleSheet.create({
    container: {
      marginBottom: 12,
    },
    label: {
      fontFamily: 'PTSerif_700Bold',
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

export const darkThemeStyles = StyleSheet.create({
    container: {
      marginBottom: 12,
    },
    label: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 14,
      marginBottom: 5,
      color: '#FFFFFF', // Adjusted text color for dark mode
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#666666', // Adjusted border color for dark mode
      borderRadius: 5,
      padding: 10,
      color: '#FFFFFF', // Adjusted text color for dark mode
      backgroundColor: '#333333', // Adjusted background color for dark mode
    },
  });
  
  export default darkThemeStyles;