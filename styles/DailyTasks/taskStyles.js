import { StyleSheet } from "react-native";

export const lightThemeStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    taskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: 50,
      left: 20,
    },
    header: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 20,
      marginBottom: 20,
    },
    backButtonText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 5,
    },
    taskText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginRight: 10,
    },
    completeTaskButton: {
      backgroundColor: '#F21E1E',
      padding: 8,
      borderRadius: 5,
      left:8,
    },
    completeTaskButtonText: {
      color: 'white',
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
    },
  });

  export const darkThemeStyles = {
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#333333', // Dark background color
      justifyContent: 'center',
      alignItems: 'center',
    },
    taskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      borderColor: '#666666', // Adjust border color
      borderWidth: 1, // Add border
      borderRadius: 5, // Add border radius
      padding: 10, // Add padding
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: 50,
      left: 20,
    },
    header: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 20,
      marginBottom: 20,
      color: '#FFFFFF', // Adjust text color
    },
    backButtonText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 5,
      color: '#CCCCCC', // Adjust text color
    },
    taskText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginRight: 10,
      color: '#FFFFFF', // Adjust text color
    },
    completeTaskButton: {
      backgroundColor: '#F21E1E',
      padding: 8,
      borderRadius: 5,
      left: 8,
    },
    completeTaskButtonText: {
      color: '#FFFFFF',
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
    },
  };