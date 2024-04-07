import { StyleSheet } from "react-native";

export const lightThemeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      marginTop: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    backButton: {
      padding: 10,
    },
    contactContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#f5f5f5', // Grey background color
    },
    contactInfo: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    number: {
      fontSize: 16,
    },
    phoneIcon: {
      backgroundColor: 'red',
      borderRadius: 20,
      padding: 10,
    },
    backButtonText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 5,
    },
    addContactContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    addContactText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    plusIcon: {
      backgroundColor: 'red',
      borderRadius: 20,
      padding: 10,
    },
  });

  export const darkThemeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333333', // Dark background color
      padding: 20,
      marginTop: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF', // Adjusted text color
      marginLeft: 10,
    },
    backButton: {
      padding: 10,
    },
    contactContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#666666', // Adjusted border color
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#444444', // Adjusted background color
    },
    contactInfo: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF', // Adjusted text color
      marginBottom: 5,
    },
    number: {
      fontSize: 16,
      color: '#FFFFFF', // Adjusted text color
    },
    phoneIcon: {
      backgroundColor: 'red',
      borderRadius: 20,
      padding: 10,
    },
    backButtonText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 5,
      color: '#FFFFFF', // Adjusted text color
    },
    addContactContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#666666', // Adjusted border color
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    addContactText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF', // Adjusted text color
      marginLeft: 10,
    },
    plusIcon: {
      backgroundColor: 'red',
      borderRadius: 20,
      padding: 10,
    },
  });