import { StyleSheet } from "react-native";

export const lightThemeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:20,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    backButtonText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 5, 
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    map: {
      width: '100%',
      height: '80%',
    },
  });

  export const darkThemeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333333', 
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    backButtonText: {
        fontFamily: 'PTSerif_400Regular',
        fontSize: 16,
        marginLeft: 5,
        color: '#FFFFFF', 
      },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#FFFFFF', 
    },
    map: {
      width: '100%',
      height: '80%',
    },
  });