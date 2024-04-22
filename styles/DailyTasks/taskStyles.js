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
    completedTaskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    completeAgainButton: {
      marginLeft: 10,
      backgroundColor: 'lightgrey',
      padding: 5,
      borderRadius: 5,
    },
    completeAgainButtonText: {
      color: 'black',
    },
  });

  export const darkThemeStyles = {
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#333333', 
      justifyContent: 'center',
      alignItems: 'center',
    },
    taskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      borderColor: '#666666', 
      borderWidth: 1, 
      borderRadius: 5, 
      padding: 10,
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
      color: '#FFFFFF', 
    },
    backButtonText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 5,
      color: '#CCCCCC', 
    },
    taskText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginRight: 10,
      color: '#FFFFFF', 
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
    completeAgainButton: {
      marginLeft: 10,
      backgroundColor: 'lightgrey',
      padding: 5,
      borderRadius: 5,
    },
    completeAgainButtonText: {
      color: 'black',
    },
  };