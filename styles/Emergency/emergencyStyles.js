import { StyleSheet } from "react-native";

export const lightThemeStyles= StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      marginTop:20,
      paddingHorizontal: 20,
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
    section: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: '#ccc',
      borderRadius: 10,
    },
    iconContainer: {
      alignItems: 'center',
    },
    iconBackground: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    cardText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 18,
      color: 'black',
      textAlign: 'center',
    },
  });

  export const darkThemeStyles = {
    container: {
      flex: 1,
      backgroundColor: '#333333',
      marginTop: 20,
      paddingHorizontal: 20,
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
    section: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: '#666666', 
      borderRadius: 10,
    },
    iconContainer: {
      alignItems: 'center',
    },
    iconBackground: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#F21E1E', 
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    cardText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 18,
      color: '#FFFFFF', 
      textAlign: 'center',
    },
  };