import { StyleSheet } from "react-native";

export const lightThemeStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
    headerText: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    inputContainer: {
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
    button: {
      backgroundColor: '#007BFF',
      borderRadius: 5,
      padding: 15,
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      fontFamily: 'PTSerif_400Regular',
      color: 'white',
      fontSize: 16,
    },
    sectionHeading: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    contactItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    contactInfo: {
      flexDirection: 'column',
      flex: 1,
    },
    contactName: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    contactNumber: {
      fontSize: 16,
    },
    contactsList: {
      flex: 1,
    },
    deleteButton: {
      backgroundColor: 'red',
      borderRadius: 20,
      padding: 7,
      alignItems: 'center',
      justifyContent: 'center',
    },
    deleteButtonText: {
      fontFamily: 'PTSerif_400Regular',
      color: 'white',
      fontSize: 12,
    },
    errorMessage: {
      fontFamily: 'PTSerif_400Regular',
      color: 'red',
      fontSize: 14,
      marginBottom: 10,
    },
  });

  export const darkThemeStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#333333', // Dark background color
    },
    headerText: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#FFFFFF', // White text color
    },
    inputContainer: {
      marginBottom: 12,
    },
    label: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 14,
      marginBottom: 5,
      color: '#FFFFFF', // White text color
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#666666', // Darker border color
      borderRadius: 5,
      padding: 10,
      color: '#FFFFFF', // White text color
    },
    button: {
      backgroundColor: '#007BFF',
      borderRadius: 5,
      padding: 15,
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      fontFamily: 'PTSerif_400Regular',
      color: '#FFFFFF', // White text color
      fontSize: 16,
    },
    sectionHeading: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      color: '#FFFFFF', // White text color
    },
    contactItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#666666', // Darker border color
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    contactInfo: {
      flexDirection: 'column',
      flex: 1,
    },
    contactName: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#FFFFFF', // White text color
    },
    contactNumber: {
      fontSize: 16,
      color: '#FFFFFF', // White text color
    },
    contactsList: {
      flex: 1,
    },
    deleteButton: {
      backgroundColor: 'red',
      borderRadius: 20,
      padding: 7,
      alignItems: 'center',
      justifyContent: 'center',
    },
    deleteButtonText: {
      fontFamily: 'PTSerif_400Regular',
      color: '#FFFFFF', // White text color
      fontSize: 12,
    },
    errorMessage: {
      fontFamily: 'PTSerif_400Regular',
      color: 'red',
      fontSize: 14,
      marginBottom: 10,
    },
  });